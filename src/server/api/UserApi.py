from .model import user, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.UserBO import UserBO


class UserApi(Resource):
    @api.marshal_with(user)
    def get(self, authId):
        """
        Übergibt den aktuellen User ans Frontend
        :param authId:
        :return: User Objekt mit allen Daten
        """
        return Administration.get_user_by_authId(authId)

    def delete(self, authId):
        """
        Löscht den aktuellen User über die GoogleID
        :param authId: GoogleID des Users
        :return: Statuscode 200: User wurde erfolgreich gelöscht
        """
        return Administration.delete_user_by_authId(authId)

    @api.expect(user)
    def put(self, authId):
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
            return Administration.update_user_by_authId(proposal)
        else:
            return 'Der User konnte nicht aktualisiert werden, da keine Daten mitgeschickt wurden', 500
