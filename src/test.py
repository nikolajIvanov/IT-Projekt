from src.server.Administration import Administration
from src.server.bo.Nutzer import Nutzer
adm = Administration()
data = {"uid": "test_uid", "name": "test_name", "email": "test_email"}
proposal = Nutzer.from_dict(data)
adm.create_user(proposal.get_uid(), proposal.get_name(), proposal.get_email())
