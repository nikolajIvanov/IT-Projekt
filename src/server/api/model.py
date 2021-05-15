from flask import Flask
from flask_restx import Api, fields


app = Flask(__name__)
api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute="_id", description='Der Unique Identifier eines Business Object'),
})

profil = api.inherit('Profil', bo, {
    'name': fields.String(attribute="_name", description='Name eines Benutzers'),
    'lerntyp': fields.String(attribute="_lerntyp", description='Lerntyp eines Benutzers'),
    'modul': fields.String(attribute="_modul", description='Module eines Benutzers'),
    'profilBild': fields.String(attribute="_profilBild", description='Bild eines Benutzers'),
    'beschreibung': fields.String(attribute="_beschreibung", description='beschreibung eines Benutzers')

})

user = api.inherit('Nutzer', profil, {
    'authId': fields.Integer(attribute="_authId", description='GoogleID eines Benutzers'),
    'geburtsdatum': fields.String(attribute="_geburtsdatum", description='Geburtsdatum eines Benutzers'),
    'email': fields.String(attribute="_email", description='E-Mail-Adresse eines Benutzers')
})


