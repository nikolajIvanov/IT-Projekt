from flask_restx import Resource
from server.Administration import Administration
from .model import delete_request, api
from server.bo.RequestBO import RequestBO


class DeleteRequestApi(Resource):

    @api.expect(delete_request)
    def post(self):
        """
        Löscht eine Anfrage aus der Datenbank
        :return: Statuscode 200 wenn dsa Löschen erfolgreich war
        """
        payload = api.payload
        if payload["type"] == "single":
            Administration.delete_request(request=payload["requestId"])
        else:
            Administration.delete_group_request(request=payload["requestId"])
        return 200
