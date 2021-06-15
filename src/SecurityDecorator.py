import os
from flask import request
from google.auth.transport import requests
import google.oauth2.id_token
from server.Administration import Administration


def secured(function):
    def wrapper(*args, **kwargs):
        firebase_request_adapter = requests.Request()
        claims = None
        objects = None
        id_token = request.cookies.get("token")
        # Bei Tests über Postman werden Tokens über den Header mitgegeben
        # hier wird überprüft, ob die Cookies leer sind und bei bedarf wird
        # dann der Token aus dem Header ausgelesen
        if id_token is None:
            try:
                id_token = request.headers['Authorization'].split(' ').pop()
            except BaseException:
                id_token = None
        if id_token:
            try:
                # Überprüfen ob Token gültig ist
                claims = google.oauth2.id_token.verify_firebase_token(
                    id_token, firebase_request_adapter)
                if claims is not None:
                    print(request)
                    if Administration().get_user_by_guid(claims.get("user_id")) is None:
                        # Wenn der User bisher nicht in der Datenbank abgespeichert ist wird überprüft,
                        # ob die Anfrage einen neuen User in der Datenbank abspeichern wird.
                        # Wenn dies auch nicht der Fall ist dann ist der User nicht befugt diese Anfrage zu stellen.
                        # Um die Entwicklung zu erleichtern wird bei lokaler
                        # Ausführung nur im Terminal der Fehler ausgegeben.
                        if not(request.full_path ==
                               '/api/user?' and request.method == 'POST'):
                            if os.getenv('GAE_ENV', '').startswith('standard'):
                                return 'Bitte registrieren', 401
                            else:
                                print(
                                    "Kein registrierter User, in der Cloud wird diese Anfrage abgelehnt!")
                    objects = function(*args, **kwargs)
                    return objects
                else:
                    # Dieser Part im Code sollte nicht aufgerufen werden
                    return 'Internal Auth Error', 500
            except ValueError as exc:
                # Wenn hier ein Fehler auftritt ist Token nicht gültig
                print(exc)
                return 'Kein gültiges Token', 401
        return 'Es wurde kein Token übergeben', 401
    return wrapper