from src.server.Administration import Administration
from src.server.bo.Nutzer import Nutzer
adm = Administration()
nutzer = adm.get_all_users()

print(nutzer)