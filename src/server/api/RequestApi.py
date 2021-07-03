from flask_restx import Resource
from server.SecurityDecorator import secured
from server.Administration import Administration
from .model import request, api
from server.bo.RequestBO import RequestBO


class RequestApi(Resource):

    @secured
    # @api.marshal_with(request)
    def get(self, auth_id):
        """
        Übergibt alle Anfragen des aktuellen Users.
        :param auth_id: GoogleID des aktuellen Users
        :return: Dict mit allen Anfragen
        """
        return Administration.get_request(auth_id)

    @secured
    @api.expect(request)
    def post(self):
        """
        Erstellt eine neue Anfrage.
        :return: Statuscode 200 wenn die Erstellung erfolgreich war
        """
        payload = api.payload
        request_body = RequestBO.create_request(auth_id=payload["authId"], angefragter_id=payload["angefragterId"])
        Administration.create_request(request_body)
        return 200
