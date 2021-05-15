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
    def create_user_by_authId(self, nutzer):

        with NutzerMapper() as mapper:
            return mapper.insert_by_authId(nutzer)

    def update_user_by_authId(self,nutzer):

        with NutzerMapper() as mapper:
            return mapper.update_by_authId(nutzer)

    def get_all_users(self):
        """

        :return: Alle Objekte unsere Nutzer
        """
        with NutzerMapper() as mapper:
            return mapper.find_all()

    def get_user_by_authId(self, number):
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

   # def get_Modul_by_authId(self,  authId):
    #    with NutzerMapper() as mapper:
     #       return mapper.get_modulForUser(authId)
