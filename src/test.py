from src.server.Administration import Administration
from src.server.bo.User import User
adm = Administration()
payload = {
    "authId": "ders neu",
    "geburtsdatum": "2021-05-14",
    "email": "email",
    "name": "2",
    "lerntyp": "3",
    "modul": ["Apfel", "UXD"],
    "profilBild": "5",
    "beschreibung": "6"
}
nutzer = User.from_dict(payload)
adm.create_user_by_authId(nutzer)


"""adm = Administration()
user = adm.get_user_by_authId("Segatz")
print(user)"""