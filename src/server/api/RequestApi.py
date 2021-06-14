from flask_restx import Resource
from server.Administration import Administration
from .model import request, api
from server.bo.RequestBO import RequestBO


class RequestApi(Resource):

    #TODO api marshal anbinden
    def get(self, authId):
        """
        Übergibt alle Anfragen des aktuellen Users.
        :param authId: GoogleID des aktuellen Users
        :return: Dict mit allen Anfragen
        """
        return Administration.get_request(authId)

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
