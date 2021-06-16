from .model import api, mitglied
from flask_restx import Resource
from server.Administration import Administration


class LerngruppenmitgliedApi(Resource):
    @api.expect(mitglied)
    def delete(self):
        altes_mitglied = [api.payload["lerngruppenId"], api.payload["userId"]]

        return Administration.delete_user_in_lerngruppe(altes_mitglied)

    @api.expect(mitglied)
    def put(self):
        new_mitglied = [api.payload["lerngruppenId"], api.payload["userId"]]
        return Administration.create_new_mitglied(new_mitglied)
