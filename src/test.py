from src.server.Administration import Administration
from src.server.bo.Nutzer import Nutzer
adm = Administration()
payload = {
    "authId": "124",
    "geburtsdatum": "2021-05-14",
    "email": "1",
    "name": "2",
    "lerntyp": "3",
    "modul": "4",
    "profilBild": "5",
    "beschreibung": "6"
}
nutzer = Nutzer.from_dict(payload)
adm.create_user_by_authId(nutzer)
