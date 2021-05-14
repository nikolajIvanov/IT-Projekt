from src.server.Administration import Administration
from src.server.bo.Nutzer import Nutzer
adm = Administration()
nutzer = adm.get_user_by_authId(123)

print(nutzer)