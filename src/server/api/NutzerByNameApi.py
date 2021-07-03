from server.SecurityDecorator import secured
from .model import user, api
from flask_restx import Resource
from server.Administration import Administration


class NutzerByNameApi(Resource):
    @secured
    @api.marshal_with(user)
    def get(self, name):
        """
        Gibt die Daten eines Nutzers anhand seines Namens wieder
        :param name: Name des Nutzers
        :return: Nutzer Daten
        """
        adm = Administration()
        nutzer = adm.get_user_by_name(name)
        return nutzer
