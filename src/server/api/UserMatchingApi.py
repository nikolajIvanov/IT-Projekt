from .model import user_matching, api
from flask_restx import Resource
from server.Administration import Administration


class UserMatchingApi(Resource):
    @api.marshal_with(user_matching)
    def get(self, authId):
        return Administration.user_match_me(authId)
