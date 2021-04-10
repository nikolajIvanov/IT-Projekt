# Import aller BusinessObject Klassen
from .bo.Nutzer import Nutzer

# Import aller Mapper Klassen
from .db.NutzerMapper import NutzerMapper


class Administration(object):
    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).

    """
    def __init__(self):
        pass

    """
        Nutzer-spezifische Methoden
    """
    def create_user(self, name, email):
        """Einen Nutzer anlegen
        :param name:
        :param email:
        :return:
        """
        user = Nutzer()
        user.set_name(name)
        user.set_email(email)
        user.set_id(1)

        with NutzerMapper() as mapper:
            return mapper.insert(user)

    def get_all_users(self):
        with NutzerMapper() as mapper:
            return mapper.find_all()

    def get_user_by_id(self, number):
        with NutzerMapper() as mapper:
            return mapper.find_by_key(number)

    def get_user_by_name(self, value):
        with NutzerMapper() as mapper:
            return mapper.find_by_name(value)
