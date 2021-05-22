from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe


class LerngruppenmitgliedApi(Resource):
    @api.expect(lerngruppe, validate=True)
    @api.marshal_with(Lerngruppe)
    def delete(self, name):
        adm = Administration()
        return adm.delete_user_by_list(name)

    @api.expect(lerngruppe, validate=True)
    @api.marshal_with(lerngruppe)
    def post(self, name):
        adm = Administration()
        return adm.create_new_mitglied(name)
