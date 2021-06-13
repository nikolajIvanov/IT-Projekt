from flask_restx import Resource
from server.Administration import Administration
from .model import request, api
from server.bo.RequestBO import RequestBO


class RequestApi(Resource):

    @api.expect(request)
    def post(self):
        """
        Erstellt einen neuen Room in der Datenbank.
        :return:
        """
        payload = api.payload
        request_body = RequestBO.create_request(auth_id=payload["authId"], angefragter_id=payload["angefragterId"])
        Administration.create_request(request_body)
        return 200

    def get(self, authId):
        pass
