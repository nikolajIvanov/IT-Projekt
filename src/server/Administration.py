# Import aller BusinessObject Klassen
from .bo.User import User

# Import aller Mapper Klassen
from .db.UserMapper import UserMapper


class Administration(object):
    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).

    """
    def __init__(self):
        pass

    """
        User-spezifische Methoden
    """
    def create_user(self, name, email):
        """Einen User anlegen
        :param name:
        :param email:
        :return:
        """
        user = User()
        user.set_name(name)
        user.set_email(email)
        user.set_id(1)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_all_users(self):
        with UserMapper() as mapper:
            return mapper.find_all()

    def get_user_by_id(self, number):
        with UserMapper() as mapper:
            return mapper.find_by_key(number)

    def get_user_by_name(self, value):
        with UserMapper() as mapper:
            return mapper.find_by_name(value)
