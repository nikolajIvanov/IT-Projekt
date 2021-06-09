from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe
from flask import abort


class LerngruppeApi(Resource):
    @api.marshal_with(lerngruppe)
    def get(self, id):
        adm = Administration()
        retrunValue = adm.get_Lerngruppe_by_id(id)
        if retrunValue[0] is 200:
            return retrunValue[1]
        else:
            abort(retrunValue[0], retrunValue[1])

    @api.marshal_with(lerngruppe)
    def delete(self, name):
        adm = Administration()
        return adm.delete_lerngruppe_by_name(name)

    @api.expect(lerngruppe, validate=True)
    def put(self, id):
        adm = Administration()
        lerngruppe = Lerngruppe.from_dict(api.payload)
        return adm.update_lerngruppe_by_id(lerngruppe)
