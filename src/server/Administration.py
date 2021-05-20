# Import aller BusinessObject Klassen

from .bo.User import User
from .bo.Lerngruppe import Lerngruppe


# Import aller Mapper Klassen
from .db.UserMapper import UserMapper
from .db.LerngruppeMapper import LerngruppeMapper

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
        """
        :param nutzer: Ist die authId
        :return: Alle Objekte des Nutzers
        """
        with UserMapper() as mapper:
            return mapper.insert_by_authId(nutzer)

    def update_user_by_authId(self,nutzer):
        """
        :param nutzer: Ist die authId
        :return: Alle Objekte des Nutzers (aktualisiert)
        """
        with UserMapper() as mapper:
            return mapper.update_by_authId(nutzer)

    def delete_user_by_authId(self, nutzer):
        """
        :param nutzer: Ist die authId
        :return:
        """
        with UserMapper() as mapper:
            return mapper.delete_by_authId(nutzer)

    def get_all_users(self):
        """

        :return: Alle Objekte unsere Nutzer
        """
        with UserMapper() as mapper:
            return mapper.find_all()

    def get_user_by_authId(self, number):
        """

        :param number: Ist die UserID
        :return:
        """
        with UserMapper() as mapper:
            return mapper.find_by_key(number)

    def get_user_by_name(self, value):
        with UserMapper() as mapper:
            return mapper.find_by_name(value)

    def update(self, name, email):
        user = User()
        user.set_name(name)
        user.set_email(email)
        user.set_id(1)

        with UserMapper() as mapper:
            return mapper.update(user)

   # def get_Modul_by_authId(self,  authId):
    #    with NutzerMapper() as mapper:
     #       return mapper.get_modulForUser(authId)


    def create_lerngruppe(self, lerngruppe):
        """
        :param lerngruppe: Objekt der Klasse Lerngruppe mit allen Attributen
        :return: Alle Objekte des Nutzers
        """
        with LerngruppeMapper() as mapper:
            return mapper.insert_by_authId(lerngruppe)


    def get_Lerngruppe_by_name(self, name):
        with LerngruppeMapper() as mapper:
            return mapper.find_by_name(name)
