from server.db.Mapper import Mapper
from server.bo.RoomBO import RoomBO


class ChatMapper(Mapper):

    def __init__(self):
        super().__init__()

    def add_message(self, user, room, nachricht):
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls für TABLE lerngruppe
        query = """INSERT INTO teamup.message (vonUserId, roomId, message) VALUES (%s ,%s ,%s)"""
        # Erstellen des SQL-Befehls

        # Daten für lerngruppe
        daten = (user, room, nachricht)

        # Ausführen des SQL-Befehls für lerngruppe
        cursor.execute(query, daten)

        self._cnx.commit()
        cursor.close()

    def get_messages_by_room(self, roomId):
        """
        :param roomId: Ist die Id des ChatRoom
        :return: Alle Nachrichten des Rooms
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor()

        # Erstellen des SQL-Befehls
        query = """SELECT vonUserId, message FROM TeamUP.message WHERE roomId=%s"""

        # Ausführen des SQL-Befehls
        cursor.execute(query, (roomId,))

        # Speichern der SQL Antwort
        messages = cursor.fetchall()

        # Schließen der Datenbankverbindung
        cursor.close()

        # Dict in List umwandeln
        history = []
        for message in messages:
            message_dict = {"userId": None, "message": None}
            message_dict["userId"] = message[0]
            message_dict["message"] = message[1]
            history.append(message_dict.copy())
        # Rückgabe der Nachrichten
        return history

    def add_user_to_room(self, room, user):
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        query1 = """INSERT INTO teamup.userInRoom(userId, roomId) VALUES (%s, %s)"""
        data1 = (user, room)
        cursor.execute(query1, data1)

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
        cursor.execute(query1, data1)

        self._cnx.commit()
        cursor.close()

    def admit_user_to_room(self, room, user):

        cursor = self._cnx.cursor(prepared=True)

        query1 = """UPDATE teamup.userInRoom SET TeamUP.userInRoom.admitted = 1 WHERE teamup.userInRoom.userId = %s
                            AND teamup.userInRoom.roomId = %s"""
        data1 = (user, room)
        cursor.execute(query1, data1)

        self._cnx.commit()
        cursor.close()

    def get_admit_status(self, room, user):
        cursor = self._cnx.cursor(prepared=True)

        query1 = """SELECT admitted, timestamp FROM TeamUP.userInRoom WHERE roomId=%s AND userId=%s"""
        data1 = (room, user)
        cursor.execute(query1, data1)

        status = cursor.fetchall()
        # Status 0 = False, Status 1 = TRUE
        # TODO: Check einbauen ob der Timestamp älter als 2 Wochen ist. Wenn ja -> delete_user_from_room

        self._cnx.commit()
        cursor.close()

        return status

    def get_roomId_by_roomName(self, name):
        cursor = self._cnx.cursor(prepared=True)

        query1 = """SELECT id FROM TeamUP.room WHERE name=%s"""
        cursor.execute(query1, name)

        room_id = cursor.fetchone()

        self._cnx.commit()
        cursor.close()

        return room_id

    def create_room(self, room):
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        query1 = """INSERT INTO teamup.room(name) VALUE %s"""

        name = RoomBO.get_name()
        cursor.execute(query1, name)

        self._cnx.commit()
        cursor.close()

        for i in room.getMitglieder():
            ChatMapper.add_user_to_room(room=ChatMapper.get_roomId_by_roomName(name), user=i)

    def delete_room_by_id(self, roomId):
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        query1 = """DELETE FROM teamup.room WHERE teamup.room.id =%s"""
        cursor.execute(query1, roomId)

        self._cnx.commit()
        cursor.close()

    def get_users_of_room(self, room):

        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor()

        # Erstellen des SQL-Befehls
        query = """SELECT userId from TeamUP.userInRoom WHERE roomId=%s"""

        # Ausführen des SQL-Befehls
        cursor.execute(query, (room,))

        # Speichern der SQL Antwort
        users_tuple = cursor.fetchall()

        # Schließen der Datenbankverbindung
        cursor.close()

        users = []
        for tuples in users_tuple:
            for i in tuples:
                users.append(i)
        return users

    def get_room_of_user(self, authId):

        userid = self.find_userid_by_authid(authId)
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor()

        # Erstellen des SQL-Befehls
        query = """SELECT roomId from TeamUP.userInRoom WHERE userId=%s"""

        # Ausführen des SQL-Befehls
        cursor.execute(query, (userid,))

        # Speichern der SQL Antwort
        rooms = cursor.fetchall()

        # Schließen der Datenbankverbindung
        cursor.close()

        users = []
        for tuples in rooms:
            for room in tuples:
                room_dict = {"roomId": None, "teilnehmer": None}
                room_dict["roomId"] = room
                room_dict["teilnehmer"] = self.get_users_of_room(room)
        users.append(room_dict.copy())

        return print(users)

    def find_all(self):
        pass
