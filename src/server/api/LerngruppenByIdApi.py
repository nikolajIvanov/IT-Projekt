from .model import lerngruppe, api
from flask_restx import Resource
from server.Administration import Administration


class LerngruppenByIdApi(Resource):
    @api.marshal_list_with(lerngruppe)
    def get(self):
        """Auslesen aller Nutzer-Objekte
        :return: nutzer
        """
        lerngruppenID = api.payload[0]["id"]
        return Administration.find_many_lerngruppen_by_id(lerngruppenID)
