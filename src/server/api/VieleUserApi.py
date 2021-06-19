from .model import user, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.UserBO import UserBO


class VieleUserApi(Resource):

    @api.expect(user)
    def post(self):
        """
        Legt mehrere Nutzer gleichzeitig an
        :return: Alle angelegten Nutzer mit deren Attributen
        """
        payload = api.payload
        users = []
        if payload:
            for _user in payload:
                proposal = UserBO.create_userBO(id=_user["id"], authId=_user["authId"], profilBild=_user["profilBild"],
                                                name=_user["name"], geburtsdatum=_user["geburtsdatum"],
                                                email=_user["email"], beschreibung=_user["beschreibung"],
                                                lerntyp=_user["lerntyp"], gender=_user["gender"],
                                                semester=_user["semester"], studiengang=_user["studiengang"],
                                                vorname=_user["vorname"], frequenz=_user["frequenz"],
                                                lernort=_user["lernort"])
                users.append(proposal)
                return Administration.insert_many_user(users)
        else:
            return 'Die User konnten nicht angelegt werden, da keine Daten mitgeschickt wurden', 500

        # TODO: Ardit die IF-Abfrage bringt nichts. Ich kann keine Werte übergeben und laufe in einen Error
        if users is not None:
            return Administration.insert_many_user(users)
        else:
            return 'Die User konnten nicht angelegt werden, da keine Daten mitgeschickt wurden', 500
