# Import aller BusinessObject Klassen
from .bo.MatchingBO import MatchingBO

# Import aller Mapper Klassen
from .db.RequestMapper import RequestMapper
from .db.UserMapper import UserMapper
from .db.LerngruppeMapper import LerngruppeMapper
from .db.StudiengangMapper import StudiengangMapper
from .db.ModulMapper import ModulMapper
from .db.LerntypMapper import LerntypMapper
from .db.ChatMapper import ChatMapper
from .db.InitMapper import InitMapper


class Administration(object):
    """
    In dieser Klasse findet die ganze Business Logik statt. Hierüber werden die Mapper für die Datenbank aufgerufen.
    """

    """
    Nutzer-spezifische Methoden
    """

    def init(self, authId):
        """
        InitMethode. Wird nach der Anmeldung des Users aufgerufen, um zu überprüfen ob der User einen eintrag in der
        DB hat.
        :param authId: GoogleID des aktuellen Users
        :return: Statuscode
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

    @staticmethod
    def insert_many_user(users):
        """
        Methode um viele User gleichzeitig anzulegen
        :param users: Liste mit mehreren User BOs
        :return: Statuscode
        """
        with UserMapper() as mapper:
            for user in users:
                mapper.insert_by_authId(user)
            # TODO Ardit kann man hier den Statuscode übergeben

    @staticmethod
    def update_user_by_authId(nutzer):
        """
        Updatet den aktuellen User
        :param nutzer: GoogleID des aktuellen Users
        :return: Alle Objekte des Nutzers (aktualisiert)
        """
        with UserMapper() as mapper:
            return mapper.update_by_authId(nutzer)

    @staticmethod
    def delete_user_by_authId(authId):
        """
        Löscht den aktuellen User aus der Datenbank
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

    # TODO KEINE VERWENDUNG NIKO Braucht man des beim chat wenn man übenr chat uafs profiel möchte
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
        Erstellt eine neue Lerngruppe in der Datenbank
        :param lerngruppe: Objekt der Klasse Lerngruppe mit allen Attributen
        :return: Statuscode
        """
        with LerngruppeMapper() as mapper:
            return mapper.insert_lerngruppe(lerngruppe)

    @staticmethod
    def get_all_lerngruppen():
        """
        Alle Lerngruppen anzeigen lassen
        :return:
        """
        with LerngruppeMapper() as mapper:
            return mapper.find_all()

    @staticmethod
    def get_Lerngruppe_by_id(gruppen_id):
        """
        Findet eine Lerngruppe über die ID
        :param gruppen_id: Die ID der gesuchten Gruppe
        :return: Objekt der Klasse Lerngruppe mit allen Attributen
        """
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

    @staticmethod
    def delete_user_in_lerngruppe(altes_mitglied):
        """
        Löscht einen Mitglied aus der Lerngruppe
        :param altes_mitglied: lerngruppenobjekt
        :return: Statuscode 200 User erfolgreich aus Gruppe gelöscht
        """
        with LerngruppeMapper() as mapper:
            return mapper.delete_user_from_lerngruppe(altes_mitglied)

    # Todo MUSS BEI DER FUNK OBEN NE AUTH ID MIT EIG NICHT?
    def update_lerngruppe(self, lerngruppe):
        """
        Updatet eine Lerngruppe
        :param lerngruppe: lerngruppenobjekt
        :return: Statuscode 200 Lerngruppe wurde erfolgreich aktualisiert
        """
        with LerngruppeMapper() as mapper:
            return mapper.update_lerngruppe(lerngruppe)

    @staticmethod
    def create_new_mitglied(new_mitglied):
        """
        Neuer Lerngruppenuser wird in die Tabelle userInLerngruppe und userinRoom geladen und die Gruppenanfrage wird
        in gruppeAdmitted gelöscht.
        :param new_mitglied: Neues Mitglied mit der UserId und LerngruppenId
        :return: Statuscode 200 User wurde in Lerngruppe eingetragen
        """
        with LerngruppeMapper() as mapper:
            return mapper.insert_user(new_mitglied)
    """
    Modul und Studiengang-spezifische Methoden
    """
    @staticmethod
    def get_all_studiengang():
        """
        Holt alle Studiengänge aus der DB
        :return: Alle Studiengänge
        """
        with StudiengangMapper() as mapper:
            return mapper.find_all()

    @staticmethod
    def get_modul_by_studiengang(studiengang):
        """
        Holt alle Module gefiltert nach den Studiengängen aus der DB
        :param studiengang: Studiengang des aktuellen Users
        :return: Gefilterte Module nach Studiengang
        """
        with ModulMapper() as mapper:
            return mapper.get_studiengangId_by_studiengang(studiengang)

    @staticmethod
    def get_lerntyp():
        """
        Gibt alle Lerntypen aus der DB
        :return: Alle Lerntypen
        """
        with LerntypMapper() as mapper:
            return mapper.find_all()
    """
    Matching Methoden
    """
    @staticmethod
    def user_match_me(authId):
        with UserMapper() as mapper:
            mainUser, finderUser = mapper.matching_method(authId)

        match = MatchingBO()
        return match.user_matching(mainUser, finderUser)

    @staticmethod
    def lerngruppe_match_me(authId):
        """
        Es werden alle User Kandidaten für das Matching aus der DB geholt und in der Klasse MatchingBO erfolgt das
        Scoring
        :param authId: GoogleID des aktuellen Users
        :return: Eine sortierte Liste mit den UserIDs die für das Matching am besten in Frage kommen
        """
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
    """
    Chat Methoden
    """
    @staticmethod
    def get_chat_by_room(room):
        """
        Wird aufgerufen, um die Chathistory aus einem bestimmten Raum zu holen
        :param room: RaumID
        :return: Alle Nachrichten aus dem Chat
        """
        with ChatMapper() as mapper:
            return mapper.get_messages_by_room(room)

    @staticmethod
    def save_message(room, message, sender):
        """
        Speichert die Nachrichten, die im Frontend geschrieben werden
        :param room: RoomID
        :param message: Die Nachricht
        :param sender: UserID des Senders
        :return: Statuscode 200 erfolgreich in der DB gespeichert.
        """
        with ChatMapper() as mapper:
            mapper.add_message(sender, room, message)

    @staticmethod
    def add_user_to_room(room, user):
        """
        Fügt einen neuen User in einen Chatroom hinzu. Wird genutzt, wenn ein User in eine Lerngruppe akzeptiert wurde
        :param room: RoomID
        :param user: UserID die dem Raum hinzugefügt werden soll
        :return: Statuscode 200 erfolgreich in der DB gespeichert.
        """
        with ChatMapper() as mapper:
            mapper.add_user_to_room(room, user)

    @staticmethod
    def get_rooms_of_user(authId):
        """
        Wird aufgerufen, wenn der User alle seine Chatrooms angezeigt bekommen will
        :param authId: GoogleID des aktuellen Users
        :return: Alle Chatrooms in die ein User sich befindet
        """
        with ChatMapper() as mapper:
            return mapper.get_room_of_user(authId)

    @staticmethod
    def delete_room_by_id(roomId):
        """
        Löscht einen Chatroom. Wird aufgerufen, wenn eine Lerngruppe oder ein Single Chat gelöscht wird.
        :param roomId: RoomID welche gelöscht werden soll
        :return: Statuscode 200 erfolgreich in der DB gelöscht.
        """
        with ChatMapper() as mapper:
            mapper.delete_room_by_id(roomId)

    @staticmethod
    def create_room(room):
        """
        Es wird ein neuer Single Chatroom erstellt
        :param room: RoomID
        :return: Statuscode 200 erfolgreich in der DB erstellt.
        """
        with ChatMapper() as mapper:
            mapper.create_user_room(room)

    @staticmethod
    def create_request(request):
        """
        Erstellt eine User Anfrage in der Datenbank
        :param request:
        :return: Statuscode 200
        """
        with RequestMapper() as mapper:
            return mapper.create_request(request)

    @staticmethod
    def create_group_request(request):
        """
        Erstellt eine Gruppenanfrage Anfrage in der Datenbank
        :param request:
        :return:
        """
        with RequestMapper() as mapper:
            return mapper.create_group_request(request)

    @staticmethod
    def get_request(authid):
        """
        Holt die Chatanfragen des aktuellen Users und überprüft, ob Chatanfragen länger als 2 Wochen sind
        :param authid: GoogleID des aktuellen Users
        :return: Alle Chatanfragen des aktuellen Users
        """
        with RequestMapper() as mapper:
            return mapper.get_user_requests(authid)

    @staticmethod
    def delete_request(request):
        """
        Löscht eine Chatanfrage aus der Datenbank
        :param request: RequestId welche gelöscht werden soll
        :return: 200 wenn der Eintrag gelöscht wurde
        """
        with RequestMapper() as mapper:
            return mapper.delete_request(request)

    @staticmethod
    def delete_group_request(request):
        """
        Löscht eine Gruppenanfrage aus der Datenbank
        :param request: RequestId welche gelöscht werden soll
        :return: 200 wenn der Eintrag gelöscht wurde
        """
        with RequestMapper() as mapper:
            return mapper.delete_group_request(request)

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
