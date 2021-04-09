from .bo.User import User

from .db.UserMapper import UserMapper


class Administration(object):

    def __init__(self):
        pass

    def create_user(self, name, email):
        pass

    def get_all_users(self):
        with UserMapper() as mapper:
            return mapper.find_all()
