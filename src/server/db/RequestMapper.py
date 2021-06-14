from server.db.Mapper import Mapper
import mysql.connector.errors
from werkzeug.exceptions import InternalServerError


class RequestMapper(Mapper):
    def __init__(self):
        super().__init__()

    def create_request(self, request):
        """
        Erstellt eine neue Anfrage in der Datenbank. Dafür wird in der Tabelle userAdmitted die UserId des Anfragers
        und des Angefragten gespeichert, sowie ein Timestamp gesetzt, mit dem Überprüft wird ob eine Anfrage älter als
        2 Wochen ist.
        :param request: BO der Klasse RequestBO mit der UserId des Anfragers und des Angefragten
        :return: Statuscode 200 wenn die Erstellung erfolgreich war
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            # Erstellen des SQL-Befehls
            user_insert = """INSERT INTO TeamUP.userAdmitted(vonUserid, anUserid) VALUES (%s ,%s)"""

            userid = self.find_userid_by_authid(request.get_auth_id())

            daten = (userid, request.get_angefragter_id())
            cursor.execute(user_insert, daten)

            self._cnx.commit()
            cursor.close()

            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def get_username_by_id(self, userId):
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        get_user_name = """SELECT vorname, name FROM TeamUP.users WHERE id=%s"""
        cursor.execute(get_user_name, (userId,))

        name = cursor.fetchone()
        ganzer_name = name[0] + name[1]

        return ganzer_name[0]

    def get_requests_by_user_id(self, userid):
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor()

            # Erstellen des SQL-Befehls
            query = """SELECT vonUserid, anUserid FROM TeamUP.userAdmitted WHERE anUserid=%s"""

            # Ausführen des SQL-Befehls
            cursor.execute(query, (userid,))

            # Speichern der SQL Antwort
            requests = cursor.fetchall()

            # Schließen der Datenbankverbindung
            cursor.close()
            message_dict = {}
            anfragen = []
            for anfrage in requests:
                message_dict["vonUserId"] = anfrage[0]
                message_dict["anUserId"] = anfrage[1]
                anfragen.append(message_dict.copy())
            # Rückgabe der Nachrichten
            return anfragen

        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def get_gruppen_requests(self, userid):
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)
            # TODO: Checken ob Anfrage gültig ist (älter als 2 Wochen)

            lerngruppenid = """SELECT id FROM TeamUP.lerngruppe WHERE admin=%s"""

            cursor.execute(lerngruppenid, (userid,))
            gruppen_from_admin = cursor.fetchall()
            erhalten = []
            erhalten_abfrage = """SELECT gA.id, gA.vonUserid, gA.anGruppenid, gA.timestamp, l.name, l.bild 
                                  FROM TeamUP.gruppeAdmitted gA JOIN TeamUP.lerngruppe l WHERE anGruppenid=%s"""
            for gruppe in gruppen_from_admin:

                cursor.execute(erhalten_abfrage, (gruppe[0],))
                erhaltene_requests = cursor.fetchall()
                message_dict = {}
                for anfrage in erhaltene_requests:
                    message_dict["requestId"] = anfrage[0]
                    message_dict["vonUserId"] = anfrage[1]
                    message_dict["timestamp"] = anfrage[2].strftime("%Y-%m-%d %H:%M:%S")
                    message_dict["name"] = anfrage[3]
                    message_dict["bild"] = anfrage[4]
                    erhalten.append(message_dict.copy())

            antwort = {"erhalten": erhalten}

            return antwort

        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def get_user_requests(self, authid):
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)
            # TODO: Checken ob Anfrage gültig ist (älter als 2 Wochen)
            # Erstellen des SQL-Befehls
            get_gestellte_requests = """SELECT uA.id, uA.anUserid , uA.timestamp,  u.vorname, u.name, 
                                        u.bild FROM TeamUP.userAdmitted uA JOIN TeamUP.users u WHERE vonUserid=%s"""

            userid = self.find_userid_by_authid(authid)

            # Ausführen des SQL-Befehls
            cursor.execute(get_gestellte_requests, (userid,))

            # Speichern der SQL Antwort
            gestellte_requests = cursor.fetchall()

            get_erhaltene_requests = """SELECT uA.id, uA.vonUserid, uA.timestamp,  u.vorname, u.name, 
                                        u.bild FROM TeamUP.userAdmitted uA JOIN TeamUP.users u WHERE anUserid=%s"""

            cursor.execute(get_erhaltene_requests, (userid,))

            erhaltene_requests = cursor.fetchall()

            cursor.close()

            message_dict = {}
            gestellt = []
            for anfrage in gestellte_requests:
                message_dict["requestId"] = anfrage[0]
                message_dict["anUserId"] = anfrage[1]
                message_dict["timestamp"] = anfrage[2].strftime("%Y-%m-%d %H:%M:%S")
                message_dict["name"] = anfrage[3] + ' ' + anfrage[4]
                message_dict["bild"] = anfrage[5]
                gestellt.append(message_dict.copy())

            erhalten = []
            for anfrage in erhaltene_requests:
                message_dict["requestId"] = anfrage[0]
                message_dict["vonUserId"] = anfrage[1]
                message_dict["timestamp"] = anfrage[2].strftime("%Y-%m-%d %H:%M:%S")
                message_dict["name"] = anfrage[3] + ' ' + anfrage[4]
                message_dict["bild"] = anfrage[5]
                erhalten.append(message_dict.copy())

            gruppen_ergebnis = self.get_gruppen_requests(userid)

            # Speichert alle Anfragen in einem Dict, der als return Übergeben wird
            requests = {"user": {
                "gestellt": gestellt,
                "erhalten": erhalten
            },
                "gruppen": gruppen_ergebnis
            }

            return requests

        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def accept_request(self, requestid):
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            query1 = """DELETE FROM TeamUP.userAdmitted WHERE id=%s"""
            cursor.execute(query1, (requestid,))

            self._cnx.commit()
            cursor.close()
            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def accept_gruppen_request(self, new_user):
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            query1 = """DELETE FROM TeamUP.gruppeAdmitted WHERE anGruppenid=%s AND vonUserid=%s"""

            # Übergabe von LerngruppenId und UserId
            data = (new_user[0], new_user[1])
            cursor.execute(query1, data)

            self._cnx.commit()
            cursor.close()
            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def create_group_request(self, request):
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            # Erstellen des SQL-Befehls
            gruppen_anfrage = """INSERT INTO TeamUP.gruppeAdmitted(vonUserid, anGruppenid) VALUES (%s ,%s)"""

            userid = self.find_userid_by_authid(request.get_auth_id())

            daten = (userid, request.get_gruppe_id())
            cursor.execute(gruppen_anfrage, daten)

            self._cnx.commit()
            cursor.close()

            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)
