from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe


class LerngruppeApi(Resource):
    @api.marshal_with(lerngruppe)
    def get(self, gruppen_id):
        return Administration.get_Lerngruppe_by_id(gruppen_id)

    def delete(self, gruppen_id):
        return Administration.delete_lerngruppe_by_id(gruppen_id)

    @api.expect(lerngruppe, validate=True)
    def put(self, gruppen_id):
        adm = Administration()
        lerngruppenBO = Lerngruppe.from_dict(api.payload)
        return adm.update_lerngruppe(lerngruppenBO)
