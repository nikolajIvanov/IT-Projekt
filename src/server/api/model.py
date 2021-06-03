from flask import Flask
from flask_restx import Api, fields


app = Flask(__name__)
api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute=lambda x: x.get_id(), description='Der Unique Identifier eines Business Object'),
})

profil = api.inherit('Profil & Gruppe', bo, {
    'name': fields.String(attribute=lambda x: x.get_name(), description='Name eines Benutzers'),
    'lerntyp': fields.String(attribute=lambda x: x.get_lerntyp(), description='Lerntyp eines Benutzers'),
    'modul': fields.List(fields.String, attribute=lambda x: x.get_modul(), description='Module eines Benutzers'),
    'profilBild': fields.String(attribute=lambda x: x.get_profilBild(), description='Bild eines Benutzers'),
    'beschreibung': fields.String(attribute=lambda x: x.get_beschreibung(), description='beschreibung eines Benutzers')

})

user = api.inherit('Nutzer', profil, {
    'authId': fields.String(attribute=lambda x: x.get_authId(), description='GoogleID eines Benutzers'),
    'geburtsdatum': fields.String(attribute=lambda x: x.get_geburtsdatum(), description='Geburtsdatum eines Benutzers'),
    'email': fields.String(attribute=lambda x: x.get_email(), description='E-Mail-Adresse eines Benutzers'),
    'gender':fields.String(attribute=lambda x: x.get_gender(), description='Gender eines Benutzers'),
})

lerngruppe = api.inherit('Lerngruppe', profil, {
    'mitglieder': fields.String(attribute=lambda x: x.get_mitglieder(), description='Mitglieder einer Lerngruppe'),
    'admin': fields.String(attribute=lambda x: x.get_admin(), description='Administrator einer Lerngruppe'),
})



