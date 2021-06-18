from .model import room, room_mitglieder, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.RoomBO import RoomBO


class ChatRoomApi(Resource):
    @api.marshal_with(room_mitglieder)
    def get(self, auth_id):
        """
        Läd alle Chatrooms in denen der User ist.
        :param auth_id: GoogelAuthId des Nutzers für welchen die Chatrooms geladen werden sollen
        :return: Alle Chat Rooms in denen der Nutzer ist
        """
        return Administration.get_rooms_of_user(auth_id)

    # TODO: Kann es den selben Endpunkt haben?
    def delete(self, room_id):
        """
        Löscht einen Chatroom anhand seiner Id
        :param room_id: Id des Raumes welcher gelöscht werden soll
        :return: 200 - wenn der Raum erfolgreich gelöscht wurde
        """
        return Administration.delete_room_by_id(room_id)

    @api.expect(room)
    def post(self):
        """
        Erstellt einen neuen Room in der Datenbank.
        :return: 200 bei erfolgreichem Anlegen eines ChatRooms
        """
        payload = api.payload
        # acceptRequest
        Administration.delete_request(request=payload["requestId"])
        # Chat Room erstellen
        chat_room = RoomBO.create_room(userAuthId=payload["userAuthId"], partnerId=payload["partnerId"])
        Administration.create_room(chat_room)
        return 200
