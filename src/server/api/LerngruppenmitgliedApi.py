from server.SecurityDecorator import secured
from .model import api, mitglied
from flask_restx import Resource
from server.Administration import Administration


class LerngruppenmitgliedApi(Resource):
    @secured
    @api.expect(mitglied)
    def delete(self):
        """
        Löscht einen Nutzer aus einer Lerngruppe
        :return: 200 - wenn der Nutzer erfolgreich gelöscht wurde
        """
        altes_mitglied = [api.payload["lerngruppenId"], api.payload["userId"]]

        return Administration.delete_user_in_lerngruppe(altes_mitglied)

    @secured
    @api.expect(mitglied)
    def put(self):
        """
        Fügt ein neues Mitglied einer Lerngruppe hinzu
        :return: 200 - wenn der Nutzer erfolgreich der Lerngruppe hinzugefügt wurde
        """
        new_mitglied = [api.payload["lerngruppenId"], api.payload["userId"]]
        return Administration.create_new_mitglied(new_mitglied)
