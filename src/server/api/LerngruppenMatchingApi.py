from server.SecurityDecorator import secured
from .model import matching, api
from flask_restx import Resource
from server.Administration import Administration


class LerngruppenMatchingApi(Resource):
    @secured
    @api.marshal_with(matching)
    def get(self, auth_id):
        """
        Ruft den Matching Algo auf um passende Lerngruppen für den Nutzer zu finden
        :param auth_id: GoogelAuthId des Nutzers für welchen die Lerngruppen gefunden werden sollen
        :return: Alle Lerngruppen welche zu dem Nutzer passen 
        """
        return Administration.lerngruppe_match_me(auth_id)
