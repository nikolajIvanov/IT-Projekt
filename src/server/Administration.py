# Import aller BusinessObject Klassen

from .bo.UserBO import UserBO
from .bo.Lerngruppe import Lerngruppe

# Import aller Mapper Klassen
from .db.UserMapper import UserMapper
from .db.LerngruppeMapper import LerngruppeMapper
from .db.StudiengangMapper import StudiengangMapper
from .db.ModulMapper import ModulMapper
from .db.LerntypMapper import LerntypMapper
from .db.InitMapper import InitMapper


# TODO Überlegen ob man was anderes braucht als get user bei Id
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

    def insert_many_user(self, nutzer):
        """
        :param nutzer: Ist die authId
        :return: Alle Objekte des Nutzers
        """
        with UserMapper() as mapper:
            return mapper.insert_many(nutzer)

    def update_user_by_authId(self, nutzer):
        """
        :param nutzer: Ist die authId
        :return: Alle Objekte des Nutzers (aktualisiert)
        """
        with UserMapper() as mapper:
            return mapper.update_by_authId(nutzer)

    def update_user_by_id(self, nutzer):
        """
        :param nutzer: Ist die Id
        :return: Alle Objekte des Nutzers (aktualisiert)
        """
        with UserMapper() as mapper:
            return mapper.update_by_id(nutzer)

    def delete_user_by_authId(self, nutzer):
        """
        :param nutzer: Ist die authId
        :return:
        """
        with UserMapper() as mapper:
            return mapper.delete_by_authId(nutzer)

    def delete_user_by_id(self, nutzer):
        """
        :param nutzer: Ist der zu löschende Nutzer
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
            return mapper.find_by_authId(number)

    def get_user_by_id(self, number):
        """

        :param number: Ist die UserID
        :return:
        """
        with UserMapper() as mapper:
            return mapper.find_by_id(number)

    def get_user_by_name(self, value):
        with UserMapper() as mapper:
            return mapper.find_by_name(value)

    def update(self, name, email):
        user = UserBO()
        user.set_name(name)
        user.set_email(email)
        user.set_id(1)
        with UserMapper() as mapper:
            return mapper.update(user)

    # def get_Modul_by_authId(self,  authId):
    #    with NutzerMapper() as mapper:
    #       return mapper.get_modulForUser(authId)

# lerngruppe besteht aus Admin, zweites Mitglied, modul, Beschreibung....

    def create_lerngruppe(self, lerngruppe):
        """
        :param lerngruppe: Objekt der Klasse Lerngruppe mit allen Attributen
        :return: Alle Objekte des Nutzers
        """
        with LerngruppeMapper() as mapper:
            return mapper.insert_lerngruppe(lerngruppe)
    
    # Alle Lerngruppen anzeigen lassen
    
    def get_all_lerngruppen(self):
        """
        :return: 
        """
        with LerngruppeMapper() as mapper:
            return mapper.find_all()
        
    # Eine bestimmte Lerngruppe durch den Parameter namen anzeigen lassen

    def get_Lerngruppe_by_name(self, name):
        with LerngruppeMapper() as mapper:
            return mapper.find_by_name(name)

    def get_Lerngruppe_by_id(self, id):
        with LerngruppeMapper() as mapper:
            return mapper.find_by_id(id)

    # Eine bestimmte Lerngruppe mit dem Parameter namen löschen

    def delete_lerngruppe_by_name(self, name):
        """
        :param name: Ist der lerngruppen
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.delete_gruppe(name)

    def delete_lerngruppe_by_id(self, id):
        """
        :param name: Ist die ID der Lerngruppe
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.delete_gruppe(id)

    # Löschen eines Gruppenmitglieds
        
    def delete_user_by_list(self, lerngruppe):
        """
        :param lerngruppe: lerngruppenobjekt
        :return: 
        """
        with LerngruppeMapper() as mapper:
            return mapper.delete_user_from_lerngruppe(lerngruppe)

    # Die Informationen einer bestimmten Lerngruppe updaten
        
    def update_lerngruppe_by_name(self, lerngruppe):
        """
        :param lerngruppe:
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.update_info_from_lerngruppe(lerngruppe)

    def update_lerngruppe_by_id(self, lerngruppe):
        """
        :param lerngruppe:
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.update_info_from_lerngruppe_by_id(lerngruppe)

    # Alle Lerngruppennamen anzeigen lassen

    def get_lerngruppennamen(self, lerngruppe):
        """
        :param lerngruppe:
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.check_name(lerngruppe)

    def create_new_mitglied(self, lerngruppe):
        """
        :param lerngruppe:
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.insert_user(lerngruppe)

    def get_all_studiengang(self):
        with StudiengangMapper() as mapper:
            return mapper.find_all()

    def get_modul_by_studiengang(self, studiengang):
        with ModulMapper() as mapper:
            return mapper.get_studiengangId_by_studiengang(studiengang)

    def get_lerntyp(self):
        with LerntypMapper() as mapper:
            return mapper.find_all()

    def user_match_me(self, authId):
        with UserMapper() as mapper:
            mainUser, finderUser = mapper.matching_method(authId)

        unsorted_user = []
        users = {"user" : None, "score": None }
        for user in finderUser:
            score = 0
            if (mainUser["lerntyp"]  == user.get_lerntyp()):
                score += 1
            if (mainUser["semester"]  == user.get_semester()):
                score += 1
            if (mainUser["studiengang"]  == user.get_studiengang()):
                score += 1
            if (mainUser["frequenz"]  == user.get_frequenz()):
                score += 1
            if (mainUser["lernort"]  == user.get_lernort()):
                score += 1
            users["user"] = user
            users["score"] = score
            unsorted_user.append(users.copy())
        sorted_user = sorted(unsorted_user, reverse=True, key=lambda k: k['score'])
        result = []
        for i in sorted_user:
            result.append(i["user"])
        return result

    #InitMethode

    def init(self, authId):
        with InitMapper() as mapper:
            return mapper.initialize(authId)
