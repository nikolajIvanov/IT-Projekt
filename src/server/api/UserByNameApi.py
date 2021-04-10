from .model import user, api
from flask_restx import Resource
from server.Administration import Administration


class UserByNameApi(Resource):
    @api.marshal_with(user)
    def get(self, name):
        adm = Administration()
        nutzer = adm.get_user_by_name(name)
        return nutzer
