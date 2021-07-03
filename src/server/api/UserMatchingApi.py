from server.SecurityDecorator import secured
from .model import matching, api
from flask_restx import Resource
from server.Administration import Administration


class UserMatchingApi(Resource):
    @secured
    @api.marshal_with(matching)
    def get(self, auth_id):
        """
        Aufrufen des Matching
        :param auth_id: Google AuthId des Nutzers für welchen Matches gefunden werden sollen
        :return:
        """
        return Administration.user_match_me(auth_id)
