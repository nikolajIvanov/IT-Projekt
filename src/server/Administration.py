# Import aller BusinessObject Klassen
from .bo.Nutzer import Nutzer

# Import aller Mapper Klassen
from .db.NutzerMapper import NutzerMapper

 #TODO Überlegen ob man was anderes braucht als get user bei Id
class Administration(object):
    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (Engl. Business Logic).

    """
    def __init__(self):
        pass

    """
        Nutzer-spezifische Methoden
    """
    def create_user(self, uid, name, email):
        """Einen Nutzer anlegen
        :param uid:
        :param name:
        :param email:
        :return:
        """
        user = Nutzer()
        user.set_name(name)
        user.set_email(email)
        user.set_id(1)
        user.set_uid(uid)

        with NutzerMapper() as mapper:
            return mapper.insert(user)

    def get_all_users(self):
        """

        :return: Alle Objekte unsere Nutzer
        """
        with NutzerMapper() as mapper:
            return mapper.find_all()

    def get_user_by_id(self, number):
        """

        :param number: Ist die UserID
        :return:
        """
        with NutzerMapper() as mapper:
            return mapper.find_by_key(number)

    def get_user_by_name(self, value):
        with NutzerMapper() as mapper:
            return mapper.find_by_name(value)

    def update(self, name, email):
        user = Nutzer()
        user.set_name(name)
        user.set_email(email)
        user.set_id(1)

        with NutzerMapper() as mapper:
            return mapper.update(user)
