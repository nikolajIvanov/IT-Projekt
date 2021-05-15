from .model import user, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Nutzer import Nutzer


class NutzerApi(Resource):
    @api.marshal_with(user)
    def get(self, authId):
        adm = Administration()
        nutzer = adm.get_user_by_authId(authId)
        return nutzer

    def delete(self):
        pass

    @api.marshal_with(user)
    def put(self):
        adm = Administration()
        nutzer = Nutzer.from_dict(api.payload)
        adm.update_user_by_authId(nutzer)


