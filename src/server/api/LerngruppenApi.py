from server.SecurityDecorator import secured
from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe


class LerngruppenApi(Resource):
    @secured
    @api.marshal_list_with(lerngruppe)
    def get(self):
        """
        Findet alle angelegten Lerngruppen
        :return: alle in der DB vorhandenen Lerngruppen
        """
        return Administration.get_all_lerngruppen()

    @secured
    @api.expect(lerngruppe)
    def post(self):
        """
        Erzeugt eine neue Lerngruppe
        :return: Alle Daten der angelegten Lerngruppe
        """
        proposal = Lerngruppe.create_lerngruppe_bo(id=api.payload["id"], lerntyp=api.payload["lerntyp"],
                                                   name=api.payload["name"], beschreibung=api.payload["beschreibung"],
                                                   profilBild=api.payload["profilBild"], admin=api.payload["admin"],
                                                   frequenz=api.payload["frequenz"], lernort=api.payload["lernort"],
                                                   mitglieder=api.payload["mitglieder"], modul=api.payload["modul"])
        if proposal is not None:
            return Administration.create_lerngruppe(proposal)
        else:
            return 'Die Lerngruppe konnte nicht angelegt werden, da keine Daten mitgeschickt wurden', 500
