from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe


class LerngruppenApi(Resource):
    @api.marshal_list_with(Lerngruppe)
    def get(self):
        adm = Administration()
        return adm.get_all_lerngruppen()

    @api.marshal_with(lerngruppe)
    def post(self):
        adm = Administration()
        proposal = Lerngruppe.from_dict(api.payload)

        if proposal is not None:
            return adm.create_lerngruppe(proposal)
        else:
            return '', 500
