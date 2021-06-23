def test(**kwargs):
    print(kwargs["a"])


test(a=1, b=2)

from server.Administration import Administration
from server.db.Mapper import Mapper

#Administration().get_rooms_of_user(1)
#Administration().get_chat_by_room(1)

Administration().get_request("1111")



