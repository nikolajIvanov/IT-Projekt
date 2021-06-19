from flask_restx import Resource
from server.Administration import Administration


class InitApi(Resource):
    def get(self, auth_id):
        adm = Administration()
        return adm.init(auth_id)
