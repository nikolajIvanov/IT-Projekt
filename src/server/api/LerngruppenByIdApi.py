from SecurityDecorator import secured
from .model import lerngruppe, api
from flask_restx import Resource, reqparse
from server.Administration import Administration


class LerngruppenByIdApi(Resource):
    @secured
    @api.marshal_list_with(lerngruppe)
    def get(self):
        """
        Auslesen mehrere Lerngruppen über die ID
        :return: Lerngruppen
        """
        parser = reqparse.RequestParser()
        parser.add_argument('group_ids', action='split')
        lerngruppen_id = parser.parse_args()["group_ids"]
        return Administration.find_many_lerngruppen_by_id(lerngruppen_id)
