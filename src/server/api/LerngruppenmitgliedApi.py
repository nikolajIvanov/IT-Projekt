from .model import api, mitglied
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Lerngruppe import Lerngruppe


class LerngruppenmitgliedApi(Resource):
    @api.expect(mitglied)
    def delete(self):
        altes_mitglied = []
        altes_mitglied.append(api.payload["lerngruppenId"])
        altes_mitglied.append(api.payload["userId"])

        return Administration.delete_user_in_lerngruppe(altes_mitglied)

    # TODO: Wann wird ein neues Mitglied hinzugefügt und was bekommt man vom Frontend?
    @api.expect(mitglied)
    def put(self):
        new_mitglied = []
        new_mitglied.append(api.payload["lerngruppenId"])
        new_mitglied.append(api.payload["userId"])

        return Administration.create_new_mitglied(new_mitglied)
