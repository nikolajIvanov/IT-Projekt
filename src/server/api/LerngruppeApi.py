from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe


class LerngruppeApi(Resource):
    @api.expect(lerngruppe, validate=True)
    @api.marshal_with(Lerngruppe)
    def get(self, name):
        adm = Administration()
        return adm.get_Lerngruppe_by_name(name)

    @api.expect(lerngruppe, validate=True)
    @api.marshal_with(Lerngruppe)
    def delete(self, name):
        adm = Administration()
        return adm.delete_lerngruppe_by_name(name)

    @api.expect(lerngruppe, validate=True)
    @api.marshal_with(lerngruppe)
    def put(self, name):
        adm = Administration()
        lerngruppe = Lerngruppe.from_dict(api.payload)
        return adm.create_lerngruppe(lerngruppe)

    @api.expect(lerngruppe, validate=True)
    @api.marshal_with(lerngruppe)
    def post(self, name):
        adm = Administration()
        proposal = Lerngruppe.from_dict(api.payload)

        if proposal is not None:
            return adm.create_lerngruppe(proposal)
        else:
            return '', 500
