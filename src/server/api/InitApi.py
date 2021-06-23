from flask_restx import Resource

from SecurityDecorator import secured
from server.Administration import Administration


class InitApi(Resource):
    @secured
    def get(self, auth_id):
        adm = Administration()
        return adm.init(auth_id)
