from SecurityDecorator import secured
from .model import studiengang, api
from flask_restx import Resource
from server.Administration import Administration


class StudiengangApi(Resource):
    @secured
    @api.marshal_with(studiengang)
    def get(self):
        """
        Läd alle Studiengänge aus der Datenbank
        :return: alle Studiengänge
        """
        return Administration.get_all_studiengang()
