from server.db.Mapper import Mapper

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

    def add_user_to_room(self, room, user):
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)


        query1 = """INSERT INTO teamup.userInRoom(userId, roomId) VALUES (%s, %s)"""
        data1 = (user, room)
        cursor.execute(query1, (data1))

        self._cnx.commit()
        cursor.close()

    def delete_user_from_room(self, room, user):
        """
        :param:
        :return:
        """

        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        query1 = """DELETE FROM teamup.userInRoom WHERE teamup.userInRoom.userId = %s
                    AND teamup.userInRoom.roomId = %s"""
        data1 = (user, room)
        cursor.execute(query1, (data1))

        self._cnx.commit()
        cursor.close()

    def create_room(self):
        #TODO: Methode implementieren
        pass