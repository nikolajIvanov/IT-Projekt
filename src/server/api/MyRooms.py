from SecurityDecorator import secured
from .model import room, api
from flask_restx import Resource
from server.Administration import Administration


class MyRooms(Resource):
    @secured
    @api.marshal_with(room)
    def get(self, auth_id):
        """
        Läd alle ChatRäume in denen ein User Mitglied ist.
        :param auth_id: Google authId des Nutzers für den alle Räume gefunden werden sollen
        :return: Alle RÄume denen der Nutzer zugeordnet ist
        """
        return Administration.get_rooms_of_user(auth_id)
