from .model import lerngruppe, api
from flask_restx import Resource, reqparse
from server.Administration import Administration


class LerngruppenByIdApi(Resource):
    @api.marshal_list_with(lerngruppe)
    def get(self):
        """
        Auslesen mehrere Lerngruppen über die ID
        :return: Lerngruppen
        """
        parser = reqparse.RequestParser()
        parser.add_argument('group_ids', action='split')
        lerngruppenID = parser.parse_args()["group_ids"]
        return Administration.find_many_lerngruppen_by_id(lerngruppenID)
