from .model import user, api
from flask_restx import Resource
from server.Administration import Administration


class UserListApi(Resource):
    @api.marshal_list_with(user)
    def get(self):
        """
        Auslesen aller User-Objekte
        :return: nutzer
        """
        adm = Administration()
        nutzer = adm.get_all_users()
        return nutzer
