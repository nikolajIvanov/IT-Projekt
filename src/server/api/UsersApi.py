from .model import user, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.User import User


class UsersApi(Resource):
    @api.marshal_list_with(user)
    def get(self):
        """Auslesen aller Nutzer-Objekte
        :return: nutzer
        """
        adm = Administration()
        nutzer = adm.get_all_users()
        return nutzer

    @api.expect(user, validate=True)
    @api.marshal_with(user)
    def post(self):
        adm = Administration()
        proposal = User.from_dict(api.payload)

        if proposal is not None:

            return adm.create_user_by_authId(proposal)
        else:
            return '', 500

    """@api.marshal_with(user)
    def post(self):
        Anlegen eines neuen Nutzer-Objekts.

        :return:
        
        adm = Administration()

        proposal = Nutzer.from_dict(api.payload)

        if proposal is not None:
            u = adm.create_user(proposal.get_uid(), proposal.get_name(), proposal.get_email())
            return u, 200
        else:
            return '', 500"""
