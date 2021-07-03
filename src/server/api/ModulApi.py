from server.SecurityDecorator import secured
from .model import modul, api
from flask_restx import Resource
from server.Administration import Administration


class ModulApi(Resource):
    @secured
    @api.marshal_with(modul)
    def get(self, studiengang):
        """
        Läd alle Module welche zu einem Studiengang gehören
        :param studiengang: Name des Studienganges
        :return: Alle zugehörigen Module
        """
        return Administration.get_modul_by_studiengang(studiengang)
