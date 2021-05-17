from .model import user, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Nutzer import Nutzer


class NutzerApi(Resource):
    @api.marshal_with(user)
    def get(self, authId):
        adm = Administration()
        return adm.get_user_by_authId(authId)

    def delete(self):
        pass

    @api.expect(user, validate=True)
    @api.marshal_with(user)
    def put(self, authId):
        adm = Administration()
        nutzer = Nutzer.from_dict(api.payload)
        return adm.update_user_by_authId(nutzer)


