from .model import lerntyp, api
from flask_restx import Resource
from server.Administration import Administration


class LerntypApi(Resource):

    @api.marshal_with(lerntyp)
    def get(self):
        return Administration.get_lerntyp()
