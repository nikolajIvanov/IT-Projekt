from .model import chat, api
from flask_restx import Resource
from server.Administration import Administration


class ModulApi(Resource):

    @api.marshal_with(room)
    def get(self, room):
        adm = Administration()
        return adm.get_chat_by_room(room)
