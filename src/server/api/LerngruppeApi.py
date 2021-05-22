from .model import Lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe


class LerngruppeApi(Resource):
    @api.marshal_with(Lerngruppe)
    def get(self, name):
        adm = Administration()
        return adm.get_Lerngruppe_by_name(name)

    def delete(self, name):
        adm = Administration()
        return adm.delete_user_by_authId()

    def update(self, name):

    @api.expect(lerngruppe, validate=True)
    @api.marshal_with(lerngruppe)
    def put(self, name):
        adm = Administration()
        nutzer = User.from_dict(api.payload)
        return adm.update_user_by_authId(nutzer)