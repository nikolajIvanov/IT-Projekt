from .model import api, chat
from flask_restx import Resource
from server.Administration import Administration


class ChatApi(Resource):

    @api.marshal_list_with(chat)
    def get(self, room):
        adm = Administration()
        return adm.get_chat_by_room(room)
