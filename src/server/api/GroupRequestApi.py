from flask_restx import Resource
from SecurityDecorator import secured
from server.Administration import Administration
from .model import group_request, api
from server.bo.RequestBO import RequestBO


class GroupRequestApi(Resource):
    @secured
    @api.expect(group_request)
    def post(self):
        """
        Erstellt eine neue Anfrage an eine Gruppe.
        :return: Statuscode 200 wenn die Erstellung erfolgreich war
        """
        payload = api.payload
        request_body = RequestBO.create_group_request(auth_id=payload["authId"], groupid=payload["groupId"])
        Administration.create_group_request(request_body)
        return 200
