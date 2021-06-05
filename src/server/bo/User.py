from src.server.bo.Profil import Profil


class User(Profil):
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

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz.

        Diese besteht aus der ID, dem Namen, den Lerntyp und den Modulen der Superklasse ergänzt durch die GoogleId

        des jeweiligen Kunden."""
        # TODO LERNTYP MODUL dazu allgemein attribute anschaun pls
        return "Customer: {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_authId(), self.get_name(),
                                                            self.get_email(), self.get_lerntyp(), self.get_modul(),
                                                             self.get_vorname())

    @staticmethod
    def from_dict(dictionary=dict()):
        """"Umwandeln eines Python dict() in einen Customer()."""
        obj = User()
        obj.set_id(dictionary["id"])
        obj.set_authId(dictionary["authId"])
        obj.set_modul(dictionary["modul"])
        obj.set_profilBild(dictionary["profilBild"])
        obj.set_beschreibung(dictionary["beschreibung"])
        obj.set_lerntyp(dictionary["lerntyp"])
        obj.set_geburtsdatum(dictionary["geburtsdatum"])
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_gender(dictionary["gender"])
        obj.set_semester(dictionary["semester"])
        obj.set_studiengang(dictionary["studiengang"])
        obj.set_vorname(dictionary["vorname"])

        return obj
