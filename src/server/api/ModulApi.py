from .model import modul, api
from flask_restx import Resource
from server.Administration import Administration


class ModulApi(Resource):

    @api.marshal_with(modul)
    def get(self, studiengang):
        adm = Administration()
        return adm.get_modul_by_studiengang(studiengang)
