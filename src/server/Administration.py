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

    def get_user_by_id(self, number):
        with UserMapper() as mapper:
            return mapper.find_by_key(number)

    def get_user_by_name(self, value):
        with UserMapper() as mapper:
            return mapper.find_by_name(value)
