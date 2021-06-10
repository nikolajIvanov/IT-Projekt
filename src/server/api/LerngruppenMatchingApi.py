from .model import matching, api
from flask_restx import Resource
from server.Administration import Administration


class LerngruppenMatchingApi(Resource):
    @api.marshal_with(matching)
    def get(self, authId):
        return Administration.lerngruppe_match_me(authId)
