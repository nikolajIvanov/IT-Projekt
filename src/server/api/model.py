from flask import Flask
from flask_restx import Api, fields


app = Flask(__name__)
api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute=lambda x: x.get_id(), description='Der Unique Identifier eines Business Object'),
})

profil = api.inherit('ProfilBO', bo, {
    'name': fields.String(attribute=lambda x: x.get_name(), description='Name eines Benutzers oder Lerngruppe'),
    'lerntyp': fields.String(attribute=lambda x: x.get_lerntyp(),
                             description='Lerntyp eines Benutzers oder Lerngruppe'),
    'modul': fields.List(fields.String, attribute=lambda x: x.get_modul(),
                         description='Module eines Benutzers oder Lerngruppe'),
    'profilBild': fields.String(attribute=lambda x: x.get_profilBild(),
                                description='Bild eines Benutzers oder Lerngruppe'),
    'beschreibung': fields.String(attribute=lambda x: x.get_beschreibung(),
                                  description='Beschreibung eines Benutzers oder Lerngruppe'),
    'frequenz': fields.String(attribute=lambda x: x.get_frequenz(), description='Wie häufig will man sich treffen?'),
    'lernort': fields.String(attribute=lambda x: x.get_lernort(),
                             description='Wo findet das Treffen statt online/offline?'),
})

user = api.inherit('Nutzer', profil, {
    'authId': fields.String(attribute=lambda x: x.get_authId(), description='GoogleID eines Benutzers'),
    'geburtsdatum': fields.String(attribute=lambda x: x.get_geburtsdatum(), description='Geburtsdatum eines Benutzers'),
    'email': fields.String(attribute=lambda x: x.get_email(), description='E-Mail-Adresse eines Benutzers'),
    'gender': fields.String(attribute=lambda x: x.get_gender(), description='Gender eines Benutzers'),
    'semester': fields.String(attribute=lambda x: x.get_semester(), description='Semester eines Benutzers'),
    'studiengang': fields.String(attribute=lambda x: x.get_studiengang(), description='Studiengang eines Benutzers'),
    'vorname': fields.String(attribute=lambda x: x.get_vorname(), description='Vorname eines Benutzers'),

})

user_without_authid = api.inherit('Nutzer', profil, {
    'geburtsdatum': fields.String(attribute=lambda x: x.get_geburtsdatum(), description='Geburtsdatum eines Benutzers'),
    'email': fields.String(attribute=lambda x: x.get_email(), description='E-Mail-Adresse eines Benutzers'),
    'gender': fields.String(attribute=lambda x: x.get_gender(), description='Gender eines Benutzers'),
    'semester': fields.String(attribute=lambda x: x.get_semester(), description='Semester eines Benutzers'),
    'studiengang': fields.String(attribute=lambda x: x.get_studiengang(), description='Studiengang eines Benutzers'),
    'vorname': fields.String(attribute=lambda x: x.get_vorname(), description='Vorname eines Benutzers'),
})

matching = api.model('MatchingBO', {
    'result': fields.List(fields.Integer, attribute=lambda x: x.get_result(),
                          description='Sortierte UserIDs aus dem Matching'),
})

lerngruppe = api.inherit('Lerngruppe', profil, {
    'mitglieder': fields.List(fields.Integer, attribute=lambda x: x.get_mitglieder(),
                              description='Mitglieder einer Lerngruppe'),
    'admin': fields.String(attribute=lambda x: x.get_admin(), description='Administrator einer Lerngruppe'),
})

studiengang = api.inherit('StudiengangBO', bo, {
    'studiengang': fields.String(attribute=lambda x: x.get_studiengang(), description='Administrator einer Lerngruppe'),
})

modul = api.inherit('ModulBO', bo, {
    'modul': fields.String(attribute=lambda x: x.get_modul(), description='Administrator einer Lerngruppe'),
})

lerntyp = api.inherit('LerntypBO', bo, {
    'bild': fields.String(attribute=lambda x: x.get_bild(), description='Bild eines Benutzers'),
    'lerntyp': fields.String(attribute=lambda x: x.get_lerntyp(), description='Administrator einer Lerngruppe'),
})

chat = api.model('Nachricht',  {
    'userId': fields.Integer(attribute='userId', description='User Id des Absenders'),
    'message': fields.String(attribute='message', description='Inhalt der Nachricht'),
})

room = api.model('Room',  {
    'requestId': fields.String(attribute='requestId', description='Id der request'),
    'roomId': fields.String(attribute='roomId', description='Room Id'),
    'userId': fields.String(attribute='userId', description='UserId der Mitglieder'),
})

room_mitglieder = api.model('Room',  {
    'roomId': fields.Integer(attribute='roomId', description='Room Id'),
    'teilnehmer': fields.List(fields.Integer, description='UserId der Mitglieder'),
    'myId': fields.Integer(attribute='myId', decription='Id des aktuellen Nutzers'),
    'name': fields.String(attribute='name', description='Name der Gruppe oder des Lernpartners')
})

mitglied = api.model('Mitglied', {
    'lerngruppenId': fields.Integer(attribute='lerngruppenId', description='Lerngruppen'),
    'userId': fields.Integer(attribute='userId', description='User Id des Absenders'),
})

request = api.model('Request', {
    'authId': fields.String(attribute='authId', description='Auth ID des Current User'),
    'angefragterId': fields.Integer(attribute='userId', description='User Id des Angefragten')
})

group_request = api.model('GroupRequest', {
    'authId': fields.String(attribute='authId', description='Auth ID des Current User'),
    'groupId': fields.Integer(attribute='groupId', description='Angefragte Gruppen ID')
})

delete_request = api.model('DeleteRequest', {
    'type': fields.String(attribute='type', description='Typ der Anfrage Single oder Group'),
    'requestId': fields.String(attribute='requestId', description='RequestId')
})
