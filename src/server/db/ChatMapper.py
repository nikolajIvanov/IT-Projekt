from server.db.Mapper import Mapper
from server.bo.NachrichtBO import NachrichtBO

class ChatMapper(Mapper):
    def __init__(self):
        super().__init__()

    def add_message(self, nachricht):
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls für TABLE lerngruppe
        query = """INSERT INTO teamup.message (vonUserId, roomId, message) VALUES (%s ,%s ,%s)"""
        # Erstellen des SQL-Befehls für TABLE userInLerngruppe für den admin

        # Daten für lerngruppe
        daten = (nachricht.get_senderId(),nachricht.get_roomId(), nachricht.get_nachricht())

        # Ausführen des SQL-Befehls für lerngruppe
        cursor.execute(query, daten)

        self._cnx.commit()
        cursor.close()
        cursor = self._cnx.cursor(prepared=True)

    def get_messages_by_room(self, roomId):
        """
        :param roomId: Ist die Id des ChatRoom
        :return: Alle Nachrichten des Rooms
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """SELECT * FROM TeamUP.message WHERE roomId=%s"""

        # Ausführen des SQL-Befehls
        cursor.execute(query, roomId)

        # Speichern der SQL Antwort
        messages = cursor.fetchall()

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()
        # Rückgabe der Nachrichten
        return messages

    def add_user_to_room(self,room):
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        gruppenMitglieder = lerngruppe.get_mitglieder()

        for i in gruppenMitglieder:
            query1 = """INSERT INTO teamup.userinlerngruppe(userId, lerngruppeId) VALUES (%s, %s)"""
            data1 = (i, lerngruppe.get_id())
            cursor.execute(query1, (data1))

        self._cnx.commit()
        cursor.close()
        return self.find_by_id(lerngruppe.get_id())

    def delete_user_from_room(self):