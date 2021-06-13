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
            query = """INSERT INTO teamup.userAdmitted (vonUserid, anUserid) VALUES (%s ,%s)"""
            # Erstellen des SQL-Befehls

            # Daten
            daten = (RequestBO.get_auth_id(request), RequestBO.get_id(request))

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

    def get_requests_by_auth_id(self, authid):
        try:
            # Öffnen der Datenbankverbindung
            cursor = self._cnx.cursor()
            #TODO: Checken ob Anfrage gültig ist (älter als 2 Wochen)
            # Erstellen des SQL-Befehls
            query = """SELECT vonUserid, anUserid FROM TeamUP.userAdmitted WHERE vonUserid=%s"""#


            # Ausführen des SQL-Befehls
            cursor.execute(query, (authid,))

            # Speichern der SQL Antwort
            requests = cursor.fetchall()

            query2 = """SELECT vonUserid, anUserid FROM TeamUP.userAdmitted WHERE anUserid=%s"""


            # Schließen der Datenbankverbindung
            cursor.close()

            anfragen = []
            for anfrage in requests:
                message_dict = {"vonUserId": None, "anUserId": None}
                message_dict["vonUserId"] = anfrage[0]
                message_dict["anUserId"] = anfrage[1]
                anfragen.append(message_dict.copy())
            # Rückgabe der Nachrichten


            return print(anfragen)

        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)