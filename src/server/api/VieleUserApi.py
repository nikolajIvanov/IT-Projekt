from .model import user, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.UserBO import UserBO


class VieleUserApi(Resource):

    @api.expect(user)
    def post(self):
        payload = api.payload
        users = []
        for user in payload:
            proposal = UserBO.create_userBO(id=user["id"], authId=user["authId"], profilBild=user["profilBild"],
                                            name=user["name"], geburtsdatum=user["geburtsdatum"],
                                            email=user["email"], beschreibung=user["beschreibung"],
                                            lerntyp=user["lerntyp"], gender=user["gender"],
                                            semester=user["semester"], studiengang=user["studiengang"],
                                            vorname=user["vorname"], frequenz=payload["frequenz"],
                                            lernort=payload["lernort"])
            users.append(proposal)

        if users is not None:
            return Administration.insert_many_user(users)
        else:
            return 'Die User konnten nicht angelegt werden, da keine Daten mitgeschickt wurden', 500
