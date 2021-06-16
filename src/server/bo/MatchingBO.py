from werkzeug.exceptions import InternalServerError


class MatchingBO:
    """
    Klasse in der das Scoring der User und Lerngruppen stattfindet.
    """

    def __init__(self):
        self.__result = []

    def get_result(self):
        return self.__result

    def set_result(self, obj_id):
        self.__result.append(obj_id)

    def user_matching(self, mainUser, finderUser):
        """
        Scoring Methode in der nach ausgewählten Kriterien geprüft wird, wie gut ein User zu dem aktuellen User passt.
        Am ende werden alle User nach Scoring sortiert (die UserID mit dem höchsten Score steht an erster Stelle) und
        die UserIDs werden in einer Liste an das Frontend übergeben
        :param mainUser: Dict mit allen relevanten Informationen des aktuellen Users für das Scoring
        :param finderUser: Liste mit allen relevanten Informationen aller Kandidaten die für das Matching infrage kommen
        :return: Sortierte Liste mit allen infrage kommenden UserIDs
        """
        try:
            unsorted_user = []
            users = {"user": None, "score": None}
            for user in finderUser:
                score = 0
                if mainUser.get_lerntyp() == user.get_lerntyp():
                    score += 1
                if mainUser.get_semester() == user.get_semester():
                    score += 1
                if mainUser.get_studiengang() == user.get_studiengang():
                    score += 1
                if mainUser.get_frequenz() == user.get_frequenz():
                    score += 1
                if mainUser.get_lernort() == user.get_lernort():
                    score += 1
                users["user"] = user.get_id()
                users["score"] = score
                unsorted_user.append(users.copy())
            # Sortiert die Kandidaten nach Scoring
            sorted_user = sorted(unsorted_user, reverse=True, key=lambda k: k['score'])
            for i in sorted_user:
                self.set_result(i["user"])

            return self
        except:
            raise InternalServerError('Kein Matching Partner vorhanden')

    def lerngruppen_matching(self, mainUser, match_gruppen):
        """
        Gruppen Scoring Methode in der nach ausgewählten Kriterien geprüft wird, wie gut ein Lerngruppe zu dem
        aktuellen User passt. Am ende werden alle Lerngruppen nach Scoring sortiert (die LerngruppenID mit dem höchsten
        Score steht an erster Stelle) und die LerngruppenIDs werden in einer Liste an das Frontend übergeben
        :param mainUser: Dict mit allen relevanten Informationen des aktuellen Users für das Scoring
        :param match_gruppen: Liste mit allen relevanten Informationen aller Gruppen Kandidaten die für das Matching
        infrage kommen
        :return: Sortierte Liste mit allen infrage kommenden LerngruppenIDs
        """
        unsorted_gruppen = []
        gruppen = {"gruppenID": None, "score": None}
        for gruppe in match_gruppen:
            score = 0
            if mainUser.get_lerntyp() == gruppe.get_lerntyp():
                score += 1
            if mainUser.get_frequenz() == gruppe.get_frequenz():
                score += 1
            if mainUser.get_lernort() == gruppe.get_lernort():
                score += 1
            gruppen["gruppenID"] = gruppe.get_id()
            gruppen["score"] = score
            unsorted_gruppen.append(gruppen.copy())

        sorted_gruppenID = sorted(unsorted_gruppen, reverse=True, key=lambda k: k['score'])
        # Sortiert die Kandidaten nach Scoring
        for i in sorted_gruppenID:
            self.set_result(i["gruppenID"])

        return self
