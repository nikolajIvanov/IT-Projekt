from server.db.Mapper import Mapper
import mysql.connector.errors
from werkzeug.exceptions import InternalServerError


class ChatMapper(Mapper):

    def __init__(self):
        super().__init__()

    def add_message(self, user, room, nachricht):
        """
        Diese Methode speichert eine Chatnachricht auf der Datenbank ab.
        :param user: ist die AuthId des Nutzers welcher die Nachricht versendet hat
        :param room: ist die RoomId an welche die Nachricht gesendet wurde
        :param nachricht: ist der Inhalt der Chatnachricht (String)
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            # Erstellen des SQL-Befehls
            query = """INSERT INTO teamup.message (vonUserId, roomId, message) VALUES (%s ,%s ,%s)"""
            # Erstellen des SQL-Befehls

            daten = (user, room, nachricht)

            # Ausführen des SQL-Befehls für lerngruppe
            cursor.execute(query, daten)

            self._cnx.commit()
            cursor.close()
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def get_messages_by_room(self, roomId):
        """
        :param roomId: Ist die Id des ChatRoom
        :return: Alle Nachrichten des Rooms
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor()

            # Erstellen des SQL-Befehls
            query = """SELECT vonUserId, message FROM TeamUP.message WHERE roomId=%s"""

            # Ausführen des SQL-Befehls
            cursor.execute(query, (roomId,))

            # Speichern der SQL Antwort
            messages = cursor.fetchall()

            cursor.close()
            message_dict = {}
            # Dict in List umwandeln
            history = []
            for message in messages:
                message_dict["userId"] = message[0]
                message_dict["message"] = message[1]
                history.append(message_dict.copy())
            # Rückgabe der Nachrichten
            return history

        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def add_user_to_room(self, room, user):
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            # SQL Befehl erstellen
            query1 = """INSERT INTO teamup.userInRoom(userId, roomId) VALUES (%s, %s)"""

            data1 = (user, room)
            cursor.execute(query1, data1)

            self._cnx.commit()
            cursor.close()
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def delete_user_from_room(self, room, user):
        """
        Diese Methode löscht die zuordnung von einem User zu einem Raum
        :param room: RoomId aus welcher der User entfernt werden soll
        :param user: Die UserId des Nutzers welcher entfernt werden soll
        """
        try:

            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            # SQL Befehl erstellen
            query1 = """DELETE FROM teamup.userInRoom WHERE teamup.userInRoom.userId = %s
                        AND teamup.userInRoom.roomId = %s"""
            data1 = (user, room)
            cursor.execute(query1, data1)

            self._cnx.commit()
            cursor.close()
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def create_user_room(self, room):
        """
        Erzeugt ein neuen Chat Room für 2 Personen
        :param room: ist das room Objekt
        :return: 200 - Raum wurde erfolgreich angelegt
        """
        try:

            userid = self.find_userid_by_authid(room.get_userAuthId())
            room.set_mitglieder_append(userid)

            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
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
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def create_learngruppen_room(self, lerngruppe, groupid):
        """
        Erzeugt ein neuen Gruppen Chatroom für eine Lerngruppe
        :param lerngruppe: Lerngruppen Objekt
        :param groupid: Id der Gruppe
        :return: 200 - Raum wurde erfolgreich angelegt
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            query1 = """INSERT INTO TeamUP.room(groupId) VALUE (%s)"""

            cursor.execute(query1, (groupid, ))
            self._cnx.commit()
            roomId = cursor.lastrowid
            cursor.close()

            # Erzeugen eines DB Eintrages für jeden selektierten User
            for user in lerngruppe.get_mitglieder():
                self.add_user_to_room(roomId, user)
            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def delete_room_by_id(self, roomId):
        """
        Löscht einen Chatroom anhand seiner Id
        :param roomId: Id des Raums welcher gelöscht werden soll
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            query1 = """DELETE FROM teamup.room WHERE teamup.room.id =%s"""
            cursor.execute(query1, roomId)

            self._cnx.commit()
            cursor.close()
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def get_users_of_room(self, room):
        """
        Selektiert alle Nutzer welche sich in einem Chat Raum befinden
        :param room: Ist die RoomId für welche die Nutzer geladen werden sollen
        :return: eine Liste mit allen UserId`s der Mitglieder
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor()

            # Erstellen des SQL-Befehls
            query = """SELECT userId from TeamUP.userInRoom WHERE roomId=%s"""

            # Ausführen des SQL-Befehls
            cursor.execute(query, (room,))

            # Speichern der SQL Antwort
            users_tuple = cursor.fetchall()

            # Schließen der Datenbankverbindung
            cursor.close()

            # Umwandels des Tuples in eine Liste
            users = []
            for tuples in users_tuple:
                for i in tuples:
                    users.append(i)
            return users

        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def get_room_bezeichnung(self, room_id, user_id):
        """
        Gibt den Namen einer Lerngruppe oder den Namen eins Chatpartners zurück
        :param room_id: RoomId welche geprüft werden soll
        :param user_id: UserId für welche der Name gefunden werden soll
        :return: Tuple mit dem Nutzer oder Lerngruppen Name
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor()

        # SQL-Befehl erstellen
        get_group_name = """SELECT name FROM TeamUP.lerngruppe 
                            INNER JOIN TeamUP.room ON TeamUP.lerngruppe.id = room.groupId 
                            WHERE room.id=%s"""

        cursor.execute(get_group_name, (room_id,))

        # speicher der SQL Antwort
        name = cursor.fetchone()

        cursor.close()

        # Überprüfen ob es sich um einen User oder um eine Gruppe handelt
        if not name:
            cursor = self._cnx.cursor()

            get_users = """SELECT userId FROM TeamUP.userInRoom WHERE roomId=%s """

            cursor.execute(get_users, (room_id,))
            users = cursor.fetchall()

            user: None
Re
            for u in users:
                if u[0] == user_id:
                    user: None
                else:
                    user = u

            get_user_name = """SELECT name FROM TeamUP.users WHERE id=%s"""

            cursor.execute(get_user_name, user)

            name = cursor.fetchone()

            return name[0]

        else:
            return name[0]

    def get_room_of_user(self, authId):
        """
        Selektiert alle Chat Rooms in denen ein User Mitglied ist.
        :param authId: die Google AuthId des Nutzers für welchen die Räume gefunden werden sollen
        :return: Tupple mit den Informationen RoomId, UserId und dem Name des Nutzers oder der Lerngruppe
        """

        userid = self.find_userid_by_authid(authId)
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
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
        query = """SELECT roomId from TeamUP.userInRoom WHERE userId=%s"""

        # Ausführen des SQL-Befehls
        cursor.execute(query, (userid,))
        rooms = cursor.fetchall()

        users = []
        for tuples in rooms:
            for room in tuples:
                room_dict = {"roomId": room,
                             "teilnehmer": self.get_users_of_room(room),
                             "name": self.get_room_bezeichnung(room, userid)
                             }
                users.append(room_dict.copy())

        return users
