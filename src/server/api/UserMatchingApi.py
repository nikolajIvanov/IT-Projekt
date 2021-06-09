from .model import user, api, user_without_authid
from flask_restx import Resource
from server.Administration import Administration
from server.bo.UserBO import UserBO


class UserMatchingApi(Resource):
    @api.marshal_with(user_without_authid)
    def get(self, authId):
        adm = Administration()
        return adm.user_match_me(authId)
