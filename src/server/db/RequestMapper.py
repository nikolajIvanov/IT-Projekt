from server.db.Mapper import Mapper
import mysql.connector.errors
from werkzeug.exceptions import InternalServerError
from datetime import timedelta, datetime


class RequestMapper(Mapper):
    def __init__(self, cnx=None):
        super().__init__(cnx)

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

    def get_gruppen_requests(self, userid):
        """
        Prüft ob es Anfragen gibt, die älter als 2 Wochen sind und löscht diese. Es wird überprüft, ob der aktuelle
        User eine Lerngruppe ist und falls es Anfragen an die Lerngruppe gibt, werden diese an den User übergeben.
        Es wird geprüft, ob der User eine Gruppe angefragt hat. Diese Methode wird aufgerufen, wenn alle Anfragen
        des aktuellen Users geprüft werden.
        :param userid: UserID des aktuellen Users
        :return: Alle Gruppen Anfragen
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            # Löscht alle Einträge die älter als 2 Wochen sind
            anfragen_löschen = """DELETE FROM teamup.gruppeadmitted 
                                  WHERE teamup.gruppeadmitted.timestamp < NOW() - INTERVAL 14 DAY """
            cursor.execute(anfragen_löschen)
            self._cnx.commit()

            lerngruppenid = """SELECT id FROM TeamUP.lerngruppe WHERE admin=%s"""

            cursor.execute(lerngruppenid, (userid,))
            gruppen_from_admin = cursor.fetchall()
            erhalten = []
            erhalten_abfrage = """SELECT gA.id, gA.vonUserid, gA.timestamp, l.name, l.bild 
                                  FROM TeamUP.gruppeAdmitted gA JOIN TeamUP.lerngruppe l WHERE anGruppenid=%s"""
            for gruppe in gruppen_from_admin:

                cursor.execute(erhalten_abfrage, (gruppe[0],))
                erhaltene_requests = cursor.fetchall()
                message_dict = {}
                for anfrage in erhaltene_requests:
                    message_dict["requestId"] = anfrage[0]
                    message_dict["vonUserId"] = anfrage[1]
                    message_dict["timestamp"] = anfrage[3].strftime("%Y-%m-%d %H:%M:%S")
                    message_dict["name"] = anfrage[4]
                    message_dict["bild"] = anfrage[5]
                    erhalten.append(message_dict.copy())

            gesendet = []
            gesendete_anfragen = """SELECT gA.id, gA.vonUserid, gA.timestamp, l.name, l.bild 
                                  FROM TeamUP.gruppeAdmitted gA JOIN TeamUP.lerngruppe l WHERE vonUserid=%s """

            cursor.execute(gesendete_anfragen, (userid,))
            ausgehende_anfragen = cursor.fetchall()
            gesendet_dict = {}
            for anfrage in ausgehende_anfragen:
                gesendet_dict["requestId"] = anfrage[0]
                gesendet_dict["vonUserId"] = anfrage[1]
                gesendet_dict["timestamp"] = anfrage[2].strftime("%Y-%m-%d %H:%M:%S")
                gesendet_dict["name"] = anfrage[3]
                gesendet_dict["bild"] = anfrage[4]
                gesendet.append(gesendet_dict.copy())

            antwort = {"erhalten": erhalten,
                       "gesendet": gesendet}

            return antwort

        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def get_user_requests(self, authid):
        """
        Mit der Methode werden alle Anfragen die der aktuelle User erhalten oder versendet hat ins Frontend übergeben.
        Es wird auch geprüft, ob der User Admin einer Lerngruppe ist und es Anfragen an die Lerngruppe gibt.
        Die Methode wird aufgerufen, wenn der User auf seine Chatrooms klickt.
        :param authid: Die GoogleID des aktuellen Users
        :return: Dict mit allen Request eines Users
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)
            # TODO: Checken ob Anfrage gültig ist (älter als 2 Wochen)
            # Löscht alle Einträge die älter als 2 Wochen sind
            anfragen_löschen = """DELETE FROM teamup.useradmitted 
                                WHERE teamup.useradmitted.timestamp < NOW() - INTERVAL 14 DAY """
            cursor.execute(anfragen_löschen)
            self._cnx.commit()

            # Erstellen des SQL-Befehls
            get_gestellte_requests = """SELECT uA.id, uA.anUserid , uA.timestamp,  u.vorname, u.name, 
                                        u.bild FROM TeamUP.userAdmitted uA JOIN TeamUP.users u ON uA.anUserid = u.id 
                                        WHERE vonUserid=%s"""

            userid = self.find_userid_by_authid(authid)

            # Ausführen des SQL-Befehls
            cursor.execute(get_gestellte_requests, (userid,))
            # Speichern der SQL Antwort
            gestellte_requests = cursor.fetchall()

            get_erhaltene_requests = """SELECT uA.id, uA.vonUserid, uA.timestamp,  u.vorname, u.name, 
                                        u.bild FROM TeamUP.userAdmitted uA JOIN TeamUP.users u ON uA.vonUserid = u.id 
                                        WHERE anUserid=%s"""

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

            message_dict = {}
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

    def delete_request(self, requestid):
        """
        Mit dieser Methode wird die Anfrage eines Users gelöscht. Die Methode wird aufgerufen, wenn der User im Frontend
        in seinen Chaträumen die Anfrage bestätigt.
        :param requestid: Request  ID mit dem aktuellen User
        :return: 200 wenn der Eintrag gelöscht wurde
        """
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
        """
        Wird aufgerufen, wenn der Admin einer Lerngruppe die Anfrage eines Users akzeptiert.
        :param new_user:  Die GruppenID und die UserID des anfragers
        :return: Statuscode 200: User erfolgreich akzeptiert.
        """
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
        """
        Wird aufgerufen, wenn ein User eine Gruppenanfrage macht.
        :param request: Bekommt ein Dict übergeben,  in der die aktuelle UserID und die LerngruppenID beinhaltet.
        :return: Statuscode 200 Anfrage wurde in der DB angelegt.
        """
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

    def delete_group_request(self, requestid):
        """"
        Löscht eine Gruppenanfrage aus der Datenbank
        :param requestid: RequestId welche gelöscht werden soll
        :return: 200 wenn der Eintrag gelöscht wurde
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            query1 = """DELETE FROM TeamUP.gruppeAdmitted WHERE id=%s"""
            cursor.execute(query1, (requestid,))

            self._cnx.commit()
            cursor.close()
            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    ###################################################################################################################
    # Nicht genutzt Methoden
    ###################################################################################################################

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