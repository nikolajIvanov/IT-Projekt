from SecurityDecorator import secured
from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe


class LerngruppeApi(Resource):
    @secured
    @api.marshal_with(lerngruppe)
    def get(self, gruppen_id):
        """
        Findet eine Lerngruppe anhand deren Id und gibt die Attribute der Lerngruppe aus
        :param gruppen_id: Id der Lerngruppe für welche die Daten abgerufen werden sollen
        :return: Alle Attribute der Lerngruppe
        """
        return Administration.get_lerngruppe_by_id(gruppen_id)

    @secured
    def delete(self, gruppen_id):
        """
        Löscht eine Lerngruppe anhand der Lerngruppen Id
        :param gruppen_id: Id der Lerngruppe welche gelöscht werden soll
        :return: 200 - wenn die Gruppe erfolgreich gelöscht wurde
        """
        return Administration.delete_lerngruppe_by_id(gruppen_id)

    @secured
    @api.expect(lerngruppe, validate=True)
    def put(self):
        """
        Aktualisiert Daten einer Lerngruppe
        :return: 200 - wenn die Daten erfolgreich aktualisiert wurden
        """
        lerngruppen_bo = Lerngruppe.from_dict(api.payload)
        return Administration.update_lerngruppe(lerngruppen_bo)
