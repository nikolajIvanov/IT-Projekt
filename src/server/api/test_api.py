from .model import user, api
from flask_restx import Resource
from server.Administration import Administration


class TestApi(Resource):
    @api.marshal_with(user)
    def get(self, number):
        adm = Administration()
        nutzer = adm.get_user_by_id(number)
        return nutzer
