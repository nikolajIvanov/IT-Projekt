from server.SecurityDecorator import secured
from .model import lerntyp, api
from flask_restx import Resource
from server.Administration import Administration


class LerntypApi(Resource):
    @secured
    @api.marshal_with(lerntyp)
    def get(self):
        """
        Läd alle Lerntypen welche in der Datenbank vorhanden sind
        :return: Alle angelegten Lerntypen
        """
        return Administration.get_lerntyp()
