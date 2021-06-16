from server.bo.ProfilBO import ProfilBO
from datetime import date


class UserBO(ProfilBO):
    def __init__(self):
        super().__init__()
        self.__email = ""
        self.__authId = ""
        self.__geburtsdatum = ""
        self.__gender = ""
        self.__semester = ""
        self.__studiengang = ""
        self.__vorname = ""

    def get_email(self):
        return self.__email

    def set_email(self, value):
        self.__email = value

    def get_authId(self):
        return self.__authId

    def set_authId(self, value):
        self.__authId = value

    def get_geburtsdatum(self,):
        return self.__geburtsdatum

    def set_geburtsdatum(self, datum):
        self.__geburtsdatum = datum

    def get_gender(self):
        return self.__gender

    def set_gender(self, gender):
        self.__gender = gender

    def get_semester(self):
        return self.__semester

    def set_semester(self, semester):
        self.__semester = semester

    def set_studiengang(self, studiengang):
        self.__studiengang = studiengang

    def get_studiengang(self):
        return self.__studiengang

    def set_vorname(self, vorname):
        self.__vorname = vorname

    def get_vorname(self):
        return self.__vorname

    def calculate_age(self):
        """
        Berechnet das aktuelle Alter eines Users
        :return: Aktuelles Alter des Users
        """
        today = date.today()
        # geb = datetime.strptime(self.get_geburtsdatum(), '%Y-%m-%d')
        geb = self.get_geburtsdatum()
        return today.year - geb.year - ((today.month, today.day) < (geb.month, geb.day))

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz.

        Diese besteht aus der ID, dem Namen, den Lerntyp und den Modulen der Superklasse ergänzt durch die GoogleId

        des jeweiligen Kunden."""
        # TODO LERNTYP MODUL dazu allgemein attribute anschauen pls
        return "Customer: {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_authId(), self.get_name(),
                                                             self.get_email(), self.get_lerntyp(), self.get_modul(),
                                                             self.get_vorname())

    @staticmethod
    def create_userBO(**kwargs):
        """
        Allgemeine Klassenmethode zur erstellung eines UserBO Objektes.
        :param kwargs: Bekommt alle Werte aus der UserBO Tabelle
        :return: Gibt ein befülltes UserBO Objekt zurück
        """
        obj = UserBO()
        obj.set_id(kwargs["id"])
        obj.set_profilBild(kwargs["profilBild"])
        obj.set_name(kwargs["name"])
        obj.set_geburtsdatum(kwargs["geburtsdatum"])
        obj.set_email(kwargs["email"])
        obj.set_beschreibung(kwargs["beschreibung"])
        obj.set_lerntyp(kwargs["lerntyp"])
        obj.set_gender(kwargs["gender"])
        obj.set_semester(kwargs["semester"])
        obj.set_studiengang(kwargs["studiengang"])
        obj.set_vorname(kwargs["vorname"])
        obj.set_authId(kwargs["authId"])
        obj.set_frequenz(kwargs["frequenz"])
        obj.set_lernort(kwargs["lernort"])
        if "modul" in kwargs:
            obj.set_module_append(kwargs["modul"])
        return obj

    @staticmethod
    def create_matching_userBO(**kwargs):
        """
        Erstellt ein UserBO mit allen relevanten Attributen, die für das Scoring benötigt werden
        :param kwargs: Alle benötigten Attribute -> id, lerntyp, semester, studiengang, frequenz, lernort
        :return: Gibt ein befülltes UserBO Objekt zurück
        """
        obj = UserBO()
        obj.set_id(kwargs["id"])
        obj.set_lerntyp(kwargs["lerntyp"])
        obj.set_semester(kwargs["semester"])
        obj.set_studiengang(kwargs["studiengang"])
        obj.set_frequenz(kwargs["frequenz"])
        obj.set_lernort(kwargs["lernort"])
        return obj
