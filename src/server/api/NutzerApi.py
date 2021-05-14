from .model import user, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.Nutzer import Nutzer


class NutzerApi(Resource):
    @api.marshal_with(user)
    def get(self, id):
        adm = Administration()
        nutzer = adm.get_user_by_authId(id)
        return nutzer

    def delete(self):
        pass

    def put(self, id):
        adm = Administration()
        n = Nutzer.from_dict(api.payload)

        if n is not None:
            n.set_id(id)
