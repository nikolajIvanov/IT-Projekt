from .model import user, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.UserBO import UserBO


class UserApi(Resource):
    @api.marshal_with(user)
    def get(self, authid):
        """
        Übergibt den aktuellen User ans Frontend
        :param authid:
        :return: User Objekt mit allen Daten
        """
        return Administration.get_user_by_auth_id(authid)

    def delete(self, auth_id):
        """
        Löscht den aktuellen User über die GoogleID
        :param auth_id: GoogleID des Users
        :return: Statuscode 200: User wurde erfolgreich gelöscht
        """
        return Administration.delete_user_by_auth_id(auth_id)

    @api.expect(user)
    def put(self):
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
            return Administration.update_user_by_auth_id(proposal)
        else:
            return 'Der User konnte nicht aktualisiert werden, da keine Daten mitgeschickt wurden', 500
