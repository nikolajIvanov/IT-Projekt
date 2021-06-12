from .model import api, chat
from flask_restx import Resource
from server.Administration import Administration


class ChatApi(Resource):

    @api.marshal_list_with(chat)
    def get(self, roomId):
        return Administration.get_chat_by_room(roomId)
