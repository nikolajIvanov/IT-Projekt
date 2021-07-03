from flask_restx import Resource
from server.SecurityDecorator import secured
from server.Administration import Administration
from .model import delete_request, api


class DeleteRequestApi(Resource):
    @secured
    @api.expect(delete_request)
    def post(self):
        """
        Löscht eine Anfrage aus der Datenbank. Über den Parameter type im JSON wird zwischen Gruppen und Einzelanfragen
        unterschieden.
        :return: Statuscode 200 wenn das Löschen erfolgreich war
        """
        payload = api.payload
        if payload["type"] == "single":
            Administration.delete_request(request=payload["requestId"])
        else:
            Administration.delete_group_request(request=payload["requestId"])
        return 200
