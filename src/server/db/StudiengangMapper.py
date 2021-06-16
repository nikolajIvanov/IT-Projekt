from server.db.Mapper import Mapper
from server.bo.StudiengangBO import StudiengangBO


class StudiengangMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Gibt alle Studiengänge aus der Datenbank wieder.
        :return:
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, studiengang FROM TeamUP.studiengang")
        tuples = cursor.fetchall()

        for (stg_id, studiengang) in tuples:
            obj = StudiengangBO()
            obj.set_id(stg_id)
            obj.set_studiengang(studiengang)
            result.append(obj)

        self._cnx.commit()
        cursor.close()

        return result
