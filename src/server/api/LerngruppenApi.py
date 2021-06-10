from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe
from flask import abort


class LerngruppenApi(Resource):
    @api.marshal_list_with(lerngruppe)
    def get(self):
        adm = Administration()
        return adm.get_all_lerngruppen()


    @api.expect(lerngruppe)
    def post(self):
        adm = Administration()
        proposal = Lerngruppe.from_dict(api.payload)
        return adm.create_lerngruppe(proposal)

