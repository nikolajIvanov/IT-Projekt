from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe


class LerngruppenmitgliedApi(Resource):
    @api.marshal_with(lerngruppe)
    def delete(self):
        adm = Administration()
        proposal = Lerngruppe.from_dict(api.payload)
        return adm.delete_user_in_lerngruppe(proposal)

    # TODO: Wann wird ein neues Mitglied hinzugefügt und was bekommt man vom Frontend?
    @api.marshal_with(lerngruppe)
    def put(self):
        proposal = Lerngruppe.create_lerngruppeBO(id=api.payload["id"], lerntyp=api.payload["lerntyp"],
                                                  name=api.payload["name"], beschreibung=api.payload["beschreibung"],
                                                  profilBild=api.payload["profilBild"], admin=api.payload["admin"],
                                                  frequenz=api.payload["frequenz"], lernort=api.payload["lernort"],
                                                  mitglieder=api.payload["mitglieder"])

        return Administration.create_new_mitglied(proposal)
