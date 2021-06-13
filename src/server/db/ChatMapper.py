from server.db.Mapper import Mapper
from server.bo.RoomBO import RoomBO
from server.bo.Lerngruppe import Lerngruppe


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

    def create_user_room(self, room):
        # Öffnen der Datenbankverbindung

        userid = self.find_userid_by_authid(room.get_userAuthId())
        room.set_mitglieder_append(userid)

        cursor = self._cnx.cursor(prepared=True)

        query1 = """INSERT INTO TeamUP.room(groupId) VALUE (%s)"""

        group = None
        cursor.execute(query1, (group, ))
        self._cnx.commit()
        roomId = cursor.lastrowid
        cursor.close()

        for user in room.get_mitglieder():
            self.add_user_to_room(roomId, user)

        return 200

    def create_learngruppen_room(self, lerngruppe, groupid):
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        query1 = """INSERT INTO TeamUP.room(groupId) VALUE (%s)"""

        group = groupid
        cursor.execute(query1, (group, ))
        self._cnx.commit()
        roomId = cursor.lastrowid
        cursor.close()

        for user in lerngruppe.get_mitglieder():
            self.add_user_to_room(roomId, user)
        return 200

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
        """
        # query_admin = SELECT id, roomId, admin from TeamUP.lerngruppe WHERE admin=%s

        cursor.execute(query_admin, (userid,))
        admin = cursor. fetchall()
        # query_mitglieder = SELECT userId from TeamUP.userInLerngruppe WHERE lerngruppeId=%s AND admitted = 0
        for gruppe in admin:
            cursor.execute(query_mitglieder, (gruppe[0],))
            unbestätigte_mitglieder = cursor.fetchall()
        """

        # Erstellen des SQL-Befehls
        query = """SELECT roomId, userId, admitted from TeamUP.userInRoom WHERE userId=%s"""

        # Ausführen des SQL-Befehls
        cursor.execute(query, (userid,))
        rooms = cursor.fetchall()
        query1 = """SELECT id FROM TeamUP.room WHERE id=%s"""
        test = []
        for room in rooms:
            cursor.execute(query1, (room[0],))
            test.append(cursor.fetchone())

        cursor.close()

        users = []
        for tuples in rooms:
            for room in tuples:
                room_dict = {"roomId": None, "teilnehmer": None}
                room_dict["roomId"] = room
                room_dict["teilnehmer"] = self.get_users_of_room(room)
        users.append(room_dict.copy())

        """
        [
            {"roomId": 1, },
        ]
        
        """

        return print(users)
