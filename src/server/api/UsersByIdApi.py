from .model import user_without_authid, api
from flask_restx import Resource
from server.Administration import Administration


class UsersByIdApi(Resource):
    @api.marshal_list_with(user_without_authid)
    def get(self):
        """Auslesen aller Nutzer-Objekte
        :return: nutzer
        """
        # TODO: Payload muss angepasst werden
        return Administration.find_many_users_by_id(api.payload)
