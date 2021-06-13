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
                                                  mitglieder=api.payload["mitglieder"], modul=api.payload["modul"])
        if proposal is not None:
            return Administration.create_lerngruppe(proposal)
        else:
            return 'Die Lerngruppe konnte nicht angelegt werden, da keine Daten mitgeschickt wurden', 500
