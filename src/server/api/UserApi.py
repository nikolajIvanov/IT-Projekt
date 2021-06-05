from .model import user, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.User import User


class UserApi(Resource):
    @api.marshal_with(user)
    def get(self, authId):
        adm = Administration()
        return adm.get_user_by_authId(authId)

    def delete(self, authId):
        adm = Administration()
        adm.delete_user_by_id(authId)
        return 200

    # @api.expect(user, validate=True)
    @api.expect(user)
    @api.marshal_with(user)
    def put(self, authId):
        adm = Administration()
        nutzer = User.from_dict(api.payload)
        return adm.update_user_by_authId(nutzer)


