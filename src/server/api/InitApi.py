from .model import user, api
from flask_restx import Resource
from server.Administration import Administration


class InitApi(Resource):
    def get(self, authId):
        adm = Administration()
        return adm.init(authId)
