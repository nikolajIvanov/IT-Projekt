from SecurityDecorator import secured
from .model import user_without_authid, api
from flask_restx import Resource, reqparse
from server.Administration import Administration


class UsersByIdApi(Resource):

    @secured
    @api.marshal_list_with(user_without_authid)
    def get(self):
        """
        Auslesen aller Nutzer-Objekte
        :return: nutzer
        """
        parser = reqparse.RequestParser()
        parser.add_argument('user_ids', action='split')
        user_ids = parser.parse_args()["user_ids"]
        return Administration.find_many_users_by_id(user_ids)
