from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe


class LerngruppeApi(Resource):
    @api.marshal_with(Lerngruppe)
    def get(self, id):
        adm = Administration()
        return adm.get_Lerngruppe_by_id(id)

    @api.marshal_with(Lerngruppe)
    def delete(self, name):
        adm = Administration()
        return adm.delete_lerngruppe_by_name(name)

    @api.expect(lerngruppe, validate=True)
    def put(self, id):
        adm = Administration()
        lerngruppe = Lerngruppe.from_dict(api.payload)
        return adm.update_lerngruppe_by_id(lerngruppe)
