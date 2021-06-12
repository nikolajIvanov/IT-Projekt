from .model import room, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.RoomBO import RoomBO


class ChatRoomApi(Resource):

    @api.marshal_with(room)
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
        chat_room = RoomBO.create_room(name=payload["name"], mitglieder=payload["mitglieder"])
        Administration.create_room(chat_room)
    """ 
   @api.expect(room, validate=True)
    def put(self,):
        adm = Administration()
        lerngruppenBO = Lerngruppe.from_dict(api.payload)
        return adm.update_lerngruppe(lerngruppenBO)
    """
