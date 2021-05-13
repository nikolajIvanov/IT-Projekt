from src.server.bo import Profil



class Nutzer(Profil):
    def __init__(self):
        super().__init__()
        self.__email = ""
        self.__uid = ""
        self.__geburtsdatum = ""

    def get_email(self):
        return self.__email

    def set_email(self, value):
        self.__email = value

    def get_uid(self):
        return self.__uid

    def set_uid(self, value):
        self.__uid = value

    def get_geburtsdatum(self,):
        return self.__geburtsdatum

    def set_geburtsdatum(self, datum):
        self.__geburtsdatum = datum

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz.

        Diese besteht aus der ID, dem Namen, den Lerntyp und den Modulen der Superklasse ergänzt durch die Google

        des jeweiligen Kunden."""
        # TODO LERNTYP MODUL dazu allgemein attribute anschaun pls
        return "Customer: {}, {}, {}, {}".format(self.get_id(), self.get_uid(), self.get_name(), self.get_email())

    @staticmethod
    def from_dict(dictionary=dict()):
        """"Umwandeln eines Python dict() in einen Customer()."""
        obj = Nutzer()
        # obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_uid(dictionary["uid"])
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        return obj
