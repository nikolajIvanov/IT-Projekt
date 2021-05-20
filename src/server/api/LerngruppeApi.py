from .model import Lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe


class LerngruppeApi(Resource):
    @api.marshal_with(Lerngruppe)
    def get(self, name):
        adm = Administration()
        return adm.get_Lerngruppe_by_name(name)

    def delete(self, authId):
        adm = Administration()
        return adm.delete_user_by_authId(authId)

    @api.expect(user, validate=True)
    @api.marshal_with(user)
    def put(self, authId):
        adm = Administration()
        nutzer = User.from_dict(api.payload)
        return adm.update_user_by_authId(nutzer)