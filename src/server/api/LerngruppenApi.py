from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe


class LerngruppenApi(Resource):
    @api.marshal_list_with(lerngruppe)
    def get(self):
        adm = Administration()
        return adm.get_all_lerngruppen()

    @api.expect(lerngruppe)
    def post(self):
        proposal = Lerngruppe.create_lerngruppeBO(id=api.payload["id"], lerntyp=api.payload["lerntyp"],
                                                  name=api.payload["name"], beschreibung=api.payload["beschreibung"],
                                                  profilBild=api.payload["profilBild"], admin=api.payload["admin"],
                                                  frequenz=api.payload["frequenz"], lernort=api.payload["lernort"],
                                                  mitglieder=api.payload["mitglieder"])

        return Administration.create_lerngruppe(proposal)
