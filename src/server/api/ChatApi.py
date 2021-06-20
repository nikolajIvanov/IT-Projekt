from .model import api, chat
from flask_restx import Resource
from server.Administration import Administration


class ChatApi(Resource):

    @api.marshal_list_with(chat)
    def get(self, room_id):
        """
        Läd alle Chat Nachrichten für einen Raum
        :param room_id: Id des Raumes für welchen die Nachrichten geladen werden sollen
        :return: Alle nachrichten welche an die roomId geschickt wurden
        """
        return Administration.get_chat_by_room(room_id)
