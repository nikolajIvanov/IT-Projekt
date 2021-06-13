from flask_restx import Resource
from server.Administration import Administration
from .model import request, api
from server.bo.RequestBO import RequestBO


class RequestApi(Resource):
    def get(self, auth_id):
        pass

    @api.expect(request)
    def post(self):
        """
        Erstellt eine neue Anfrage.
        :return:
        """
        payload = api.payload
        request_body = RequestBO.create_request(auth_id=payload["authId"], angefragter_id=payload["angefragterId"])
        Administration.create_request(request_body)
        return 200
