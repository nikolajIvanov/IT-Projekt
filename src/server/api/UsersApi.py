from .model import user, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.UserBO import UserBO


class UsersApi(Resource):
    @api.marshal_list_with(user)
    def get(self):
        """Auslesen aller Nutzer-Objekte
        :return: nutzer
        """
        return Administration.get_all_users()

    @api.expect(user)
    def post(self):
        """
        Erstellt einen neuen User in der Datenbank.
        :return:
        """
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

            return Administration.create_user_by_authId(proposal)
        else:
            return 'Der User konnte nicht angelegt werden, da keine Daten mitgeschickt wurden', 500

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
