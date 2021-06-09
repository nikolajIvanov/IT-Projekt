from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe
from flask import abort


class LerngruppenApi(Resource):
    @api.marshal_list_with(lerngruppe)
    def get(self):
        adm = Administration()
        retrunValue = adm.get_all_lerngruppen()
        if retrunValue is None:
            abort(400,'Keine Lerngruppen vorhanden')
        elif retrunValue[0] is 200:
            return retrunValue[1]
        else:
            abort(retrunValue[0], retrunValue[1])



    @api.expect(lerngruppe)
    def post(self):
        adm = Administration()
        proposal = Lerngruppe.from_dict(api.payload)
        retrunValue = adm.create_lerngruppe(proposal)
        if retrunValue is 200:
            return retrunValue
        else:
            abort(retrunValue[0],retrunValue[1])
