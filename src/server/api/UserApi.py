from .model import user, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.UserBO import UserBO


class UserApi(Resource):
    @api.marshal_with(user)
    def get(self, authId):
        adm = Administration()
        return adm.get_user_by_authId(authId)

    def delete(self, authId):
        adm = Administration()
        return adm.delete_user_by_id(authId)


    @api.expect(user)
    def put(self, authId):
        adm = Administration()
        payload = api.payload
        proposal = UserBO.create_userBO(id=payload["id"], authId=payload["authId"], profilBild=payload["profilBild"],
                                        name=payload["name"], geburtsdatum=payload["geburtsdatum"],
                                        email=payload["email"], beschreibung=payload["beschreibung"],
                                        lerntyp=payload["lerntyp"], gender=payload["gender"],
                                        semester=payload["semester"], studiengang=payload["studiengang"],
                                        vorname=payload["vorname"], frequenz=payload["frequenz"],
                                        lernort=payload["lernort"])
        for modul in payload["modul"]:
            proposal.set_module_append(modul)

        if proposal is not None:
            return adm.update_user_by_authId(proposal)
        else:
            return 500,''
