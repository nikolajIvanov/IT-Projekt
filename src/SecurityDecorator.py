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
                    objects = function(*args, **kwargs)
                    return objects
                else:
                    return '', 401

            except ValueError as exc:
                # Wenn hier ein Fehler auftritt ist Token nicht gültig
                return exc, 401
        return 'Es wurde kein Token übergeben', 401

    return wrapper