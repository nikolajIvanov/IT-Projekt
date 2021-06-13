from server.db.Mapper import Mapper
from server.bo.RequestBO import RequestBO
import mysql.connector.errors
from werkzeug.exceptions import InternalServerError


class RequestMapper(Mapper):
    def __init__(self):
        super().__init__()

    def create_request(self, request):
        try:
            # Öffnen der Datenbankverbindung
            cursor = self._cnx.cursor(prepared=True)

            # Erstellen des SQL-Befehls
            query = """INSERT INTO teamup.userAdmitted(vonUserid, anUserid) VALUES (%s ,%s)"""
            # Erstellen des SQL-Befehls

            # Daten
            daten = (RequestBO.get_auth_id(request), RequestBO.get_angefragter_id(request))

            # Ausführen des SQL-Befehls
            cursor.execute(query, daten)

            self._cnx.commit()
            cursor.close()

            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def get_requests_by_user_id(self, userid):
        try:
            # Öffnen der Datenbankverbindung
            cursor = self._cnx.cursor()

            # Erstellen des SQL-Befehls
            query = """SELECT vonUserid, anUserid FROM TeamUP.userAdmitted WHERE anUserid=%s"""

            # Ausführen des SQL-Befehls
            cursor.execute(query, (userid,))

            # Speichern der SQL Antwort
            requests = cursor.fetchall()

            # Schließen der Datenbankverbindung
            cursor.close()

            anfragen = []
            for anfrage in anfragen:
                message_dict = {"vonUserId": None, "anUserId": None}
                message_dict["vonUserId"] = anfrage[0]
                message_dict["anUserId"] = anfrage[1]
                anfragen.append(message_dict.copy())
            # Rückgabe der Nachrichten
            return print(anfragen)

        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def get_gruppen_requests(self, auth_id):
        try:
            # Öffnen der Datenbankverbindung
            cursor = self._cnx.cursor(prepared=True)
            # TODO: Checken ob Anfrage gültig ist (älter als 2 Wochen)

            lgquery = """SELECT id FROM TeamUP.lerngruppe WHERE admin=%s"""

            cursor.execute(lgquery, (self.find_userid_by_authid(auth_id),))
            gruppen_from_admin = cursor.fetchall()
            erhalten = []
            for gruppe in gruppen_from_admin:
                # Erstellen des SQL-Befehls
                query = """SELECT id, vonUserid, anGruppenid FROM TeamUP.gruppeAdmitted WHERE anGruppenid=%s"""  #

                # Ausführen des SQL-Befehls
                cursor.execute(query, (gruppe[0],))

                # Speichern der SQL Antwort
                erhaltene_requests = cursor.fetchall()

                for anfrage in erhaltene_requests:
                    message_dict = {"requestId": None, "vonUserId": None, "anGruppenId": None}
                    message_dict["requestId"] = anfrage[0]
                    message_dict["vonUserId"] = anfrage[1]
                    message_dict["anGruppenId"] = anfrage[2]
                    erhalten.append(message_dict.copy())

            query2 = """SELECT id, vonUserid, anGruppenid FROM TeamUP.gruppeAdmitted WHERE vonUserid=%s"""

            cursor.execute(query2, (auth_id,))

            gesendete_requests = cursor.fetchall()

            # Schließen der Datenbankverbindung
            cursor.close()

            gestellt = []
            for anfrage in gesendete_requests:
                message_dict = {"requestId": None, "vonUserId": None, "anGruppenId": None}
                message_dict["requestId"] = anfrage[0]
                message_dict["vonUserId"] = anfrage[1]
                message_dict["anGruppenId"] = anfrage[2]
                gestellt.append(message_dict.copy())

            antwort = {"gestellt": gestellt,
                       "erhalten": erhalten
                       }

            return antwort

        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def get_requests_by_auth_id(self, authid):
        try:
            # Öffnen der Datenbankverbindung
            cursor = self._cnx.cursor(prepared=True)
            # TODO: Checken ob Anfrage gültig ist (älter als 2 Wochen)
            # Erstellen des SQL-Befehls
            query = """SELECT id, vonUserid, anUserid FROM TeamUP.userAdmitted WHERE vonUserid=%s"""  #

            # Ausführen des SQL-Befehls
            cursor.execute(query, (authid,))

            # Speichern der SQL Antwort
            gestellte_requests = cursor.fetchall()

            query2 = """SELECT id, vonUserid, anUserid FROM TeamUP.userAdmitted WHERE anUserid=%s"""

            cursor.execute(query2, (self.find_userid_by_authid(authid),))

            erhaltene_requests = cursor.fetchall()

            # Schließen der Datenbankverbindung
            cursor.close()

            gestellt = []
            for anfrage in gestellte_requests:
                message_dict = {"requestId": None, "vonUserId": None, "anUserId": None}
                message_dict["requestId"] = anfrage[0]
                message_dict["vonUserId"] = anfrage[1]
                message_dict["anUserId"] = anfrage[2]
                gestellt.append(message_dict.copy())

            erhalten = []
            for anfrage in erhaltene_requests:
                message_dict = {"requestId": None, "vonUserId": None, "anUserId": None}
                message_dict["requestId"] = anfrage[0]
                message_dict["vonUserId"] = anfrage[1]
                message_dict["anUserId"] = anfrage[2]
                erhalten.append(message_dict.copy())

            gruppen_ergebnis = self.get_gruppen_requests(authid)

            antwort = {"user": {
                "gestellt": gestellt,
                "erhalten": erhalten
            },
                "gruppen": gruppen_ergebnis
            }

            return antwort

        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def accept_request(self, requestid):
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        query1 = """DELETE FROM teamup.userAdmitted WHERE id = %s"""
        cursor.execute(query1, (requestid,))

        self._cnx.commit()
        cursor.close()

    def create_group_request(self, request):
        try:
            # Öffnen der Datenbankverbindung
            cursor = self._cnx.cursor(prepared=True)

            # Erstellen des SQL-Befehls
            query = """INSERT INTO teamup.gruppeAdmitted(vonUserid, anGruppenid) VALUES (%s ,%s)"""
            # Erstellen des SQL-Befehls

            # Daten
            daten = (RequestBO.get_auth_id(request), RequestBO.get_gruppe_id(request))

            # Ausführen des SQL-Befehls
            cursor.execute(query, daten)

            self._cnx.commit()
            cursor.close()

            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)
