# Import aller BusinessObject Klassen
from .bo.MatchingBO import MatchingBO

# Import aller Mapper Klassen
from .db.UserMapper import UserMapper
from .db.LerngruppeMapper import LerngruppeMapper
from .db.StudiengangMapper import StudiengangMapper
from .db.ModulMapper import ModulMapper
from .db.LerntypMapper import LerntypMapper
from .db.ChatMapper import ChatMapper
from .db.InitMapper import InitMapper


class Administration(object):
    """
        Diese Klasse aggregiert nahezu sämtliche Applikationslogik (Engl. Business Logic).
    """
    def __init__(self):
        pass

    """
        Nutzer-spezifische Methoden
    """

    def init(self, authId):
        """
        InitMethode
        :param authId:
        :return:
        """
        with InitMapper() as mapper:
            return mapper.initialize(authId)

    @staticmethod
    def create_user_by_authId(authId):
        """
        Erstellt einen neuen User über die GoogleID. Wird am Ende der Registrierung aufgerufen.
        :param authId: GoogleID des neuen Users
        :return: Alle Objekte des Nutzers
        """
        with UserMapper() as mapper:
            return mapper.insert_by_authId(authId)

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

    @staticmethod
    def delete_user_by_authId(authId):
        """
        :param authId: GoogleID des Users
        :return:
        """
        with UserMapper() as mapper:
            return mapper.delete_by_authId(authId)

    @staticmethod
    def get_all_users():
        """
        Holt alle User aus der Datenbank und gibt sie nach vorne aus
        :return: Eine Liste mit allen Usern als BOs
        """
        with UserMapper() as mapper:
            return mapper.find_all()

    @staticmethod
    def get_user_by_authId(authId):
        """
        Holt einen bestimmten User über die GoogleID
        :param authId: GoogleID des angefragten Users
        :return: User Objekt mit allen Attributen
        """
        with UserMapper() as mapper:
            return mapper.find_by_authId(authId)

    def get_user_by_id(self, user_id):
        """
        Findet einen bestimmten User über die id.
        :param user_id: Ist die UserID
        :return: Befüllten User mit allen relevanten Daten
        """
        with UserMapper() as mapper:
            return mapper.find_by_id(user_id)

    """
        Lerngruppen-spezifische Methoden
    """
    @staticmethod
    def create_lerngruppe(lerngruppe):
        """
        :param lerngruppe: Objekt der Klasse Lerngruppe mit allen Attributen
        :return: Statuscode
        """
        with LerngruppeMapper() as mapper:
            return mapper.insert_lerngruppe(lerngruppe)

    def get_all_lerngruppen(self):
        """
        Alle Lerngruppen anzeigen lassen
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.find_all()

    @staticmethod
    def get_Lerngruppe_by_id(gruppen_id):
        with LerngruppeMapper() as mapper:
            return mapper.find_by_id(gruppen_id)

    @staticmethod
    def delete_lerngruppe_by_id(gruppen_id):
        """
        Löscht eine Lerngruppe über die ID
        :param gruppen_id: Ist die ID der Lerngruppe
        :return: Statuscode 200 Lerngruppe erfolgreich gelöscht
        """
        with LerngruppeMapper() as mapper:
            return mapper.delete_gruppe(gruppen_id)

    def delete_user_in_lerngruppe(self, lerngruppe):
        """
        :param lerngruppe: lerngruppenobjekt
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.delete_user_from_lerngruppe(lerngruppe)

    def update_lerngruppe(self, lerngruppe):
        """
        :param lerngruppe:
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.update_lerngruppe(lerngruppe)

    # TODO Wann erstellen wir einen neues Mitglied?
    @staticmethod
    def create_new_mitglied(lerngruppe):
        """
        :param lerngruppe:
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.insert_user(lerngruppe)

    """
        Modul und Studiengang-spezifische Methoden
    """

    def get_all_studiengang(self):
        with StudiengangMapper() as mapper:
            return mapper.find_all()

    def get_modul_by_studiengang(self, studiengang):
        with ModulMapper() as mapper:
            return mapper.get_studiengangId_by_studiengang(studiengang)

    def get_lerntyp(self):
        with LerntypMapper() as mapper:
            return mapper.find_all()

    """
        Matching Methode
    """
    @staticmethod
    def user_match_me(authId):
        with UserMapper() as mapper:
            mainUser, finderUser = mapper.matching_method(authId)

        match = MatchingBO()
        return match.user_matching(mainUser, finderUser)

    @staticmethod
    def lerngruppe_match_me(authId):
        with LerngruppeMapper() as mapper:
            mainUser, finderGruppen = mapper.matching_method(authId)

        match = MatchingBO()
        return match.lerngruppen_matching(mainUser, finderGruppen)

    @staticmethod
    def find_many_users_by_id(usersID):
        """
        Findet einen bestimmten User über die id.
        :param usersID: Ist die UserID
        :return: Befüllten User mit allen relevanten Daten
        """
        usersBO = []
        with UserMapper() as mapper:
            for user_id in usersID:
                usersBO.append(mapper.find_by_id(int(user_id)))
        return usersBO

    @staticmethod
    def find_many_lerngruppen_by_id(lerngruppenID):
        """
        Findet mehrere Lerngruppen über die ID.
        :param lerngruppenID: Ist die UserID
        :return: Befüllte Lerngruppen mit allen relevanten Daten
        """
        lerngruppenBO = []
        with LerngruppeMapper() as mapper:
            for lerngruppe_id in lerngruppenID:
                lerngruppenBO.append(mapper.find_by_id(int(lerngruppe_id)))
        return lerngruppenBO

    def get_chat_by_room(self, room):
        with ChatMapper() as mapper:
            return mapper.get_messages_by_room(room)

    ###################################################################################################################
    # Nicht genutzt Methoden
    ###################################################################################################################

    # TODO: Wird benötigt?
    def get_lerngruppennamen(self, lerngruppe):
        """
        :param lerngruppe:
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.check_name(lerngruppe)

    # TODO: Wird benötigt?
    def update_lerngruppe_by_name(self, lerngruppe):
        """
        :param lerngruppe:
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.update_info_from_lerngruppe(lerngruppe)

    # TODO: Wird benötigt?
    def update_user_by_id(self, nutzer):
        """
        :param nutzer: Ist die Id
        :return: Alle Objekte des Nutzers (aktualisiert)
        """
        with UserMapper() as mapper:
            return mapper.update_by_id(nutzer)

    # TODO: Wird benötigt?
    def delete_user_by_id(self, nutzer):
        """
        :param nutzer: Ist der zu löschende Nutzer
        :return:
        """
        with UserMapper() as mapper:
            return mapper.delete_by_authId(nutzer)

    # TODO: Wird benötigt?
    def get_user_by_name(self, value):
        with UserMapper() as mapper:
            return mapper.find_by_name(value)

    # TODO: Wird benötigt?
    def get_Lerngruppe_by_name(self, name):
        """
        Eine bestimmte Lerngruppe durch den Parameter namen anzeigen lassen
        :param name:
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.find_by_name(name)

    # TODO: Wird benötigt?
    def delete_lerngruppe_by_name(self, name):
        """
        :param name: Ist der lerngruppen
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.delete_gruppe(name)