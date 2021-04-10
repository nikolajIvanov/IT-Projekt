from .model import user, api
from flask_restx import Resource
from server.Administration import Administration



class UserApi(Resource):
    @api.marshal_with(user)
    def get(self, nummer):
        adm = Administration()
        nutzer = adm.get_user_by_id(nummer)
        return nutzer
