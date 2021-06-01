from src.server.bo.Profil import Profil


class User(Profil):
    def __init__(self):
        super().__init__()
        self.__email = ""
        self.__authId = ""
        self.__geburtsdatum = ""
        self.__gender = ""

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

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz.

        Diese besteht aus der ID, dem Namen, den Lerntyp und den Modulen der Superklasse ergänzt durch die GoogleId

        des jeweiligen Kunden."""
        # TODO LERNTYP MODUL dazu allgemein attribute anschaun pls
        return "Customer: {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_authId(), self.get_name(), self.get_email(),
                                                     self.get_lerntyp(), self.get_modul())

    @staticmethod
    def from_dict(dictionary=dict()):
        """"Umwandeln eines Python dict() in einen Customer()."""
        obj = User()
        obj.set_authId(dictionary["authId"])
        obj.set_modul(dictionary["modul"])
        obj.set_profilBild(dictionary["profilBild"])
        obj.set_beschreibung(dictionary["beschreibung"])
        obj.set_lerntyp(dictionary["lerntyp"])
        obj.set_geburtsdatum(dictionary["geburtsdatum"])
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_gender(dictionary["gender"])

        return obj
