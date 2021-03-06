from server.SecurityDecorator import secured
from .model import user, api
from flask_restx import Resource
from server.Administration import Administration


class UserApi(Resource):
    @secured
    @api.marshal_with(user)
    def get(self, auth_id):
        """
        Übergibt den aktuellen User ans Frontend
        :param auth_id:
        :return: User Objekt mit allen Daten
        """
        return Administration.get_user_by_auth_id(auth_id)

    @secured
    def delete(self, auth_id):
        """
        Löscht den aktuellen User über die GoogleID
        :param auth_id: GoogleID des Users
        :return: Statuscode 200: User wurde erfolgreich gelöscht
        """
        return Administration.delete_user_by_auth_id(auth_id)
