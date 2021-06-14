from .model import room, room_mitglieder, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.RoomBO import RoomBO


class ChatRoomApi(Resource):
    @api.marshal_with(room_mitglieder)
    def get(self, authId):
        return Administration.get_rooms_of_user(authId)

    # TODO: Kann es den selben Endpunkt haben?
    def delete(self, roomId):
        return Administration.delete_room_by_id(roomId)

    @api.expect(room)
    def post(self):
        """
        Erstellt einen neuen Room in der Datenbank.
        :return:
        """
        payload = api.payload
        # acceptRequest
        Administration.delete_request(request=payload["requestId"])
        # Chat Room erstellen
        chat_room = RoomBO.create_room(userAuthId=payload["userAuthId"], partnerId=payload["partnerId"])
        Administration.create_room(chat_room)
        return 200
    """ 
   @api.expect(room, validate=True)
    def put(self,):
        adm = Administration()
        lerngruppenBO = Lerngruppe.from_dict(api.payload)
        return adm.update_lerngruppe(lerngruppenBO)
    """
