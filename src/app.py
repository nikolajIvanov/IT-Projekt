# Import aller Nötigen Flask Packages
from flask_cors import CORS
from flask_socketio import SocketIO, send
# Api Endpunkte
from server.api.test_api import TestApi
from server.api.UsersApi import UsersApi
from server.api.UserApi import UserApi
from server.api.LerngruppeApi import LerngruppeApi
from server.api.NutzerByNameApi import NutzerByNameApi
from server.api.model import api, app


CORS(app, resources=r'/*')
socketIo = SocketIO(app, cors_allowed_origins="*")


@socketIo.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    return None


# Api Endpunkte werden mit der Funktion add_resource an Flask übergeben
api.add_resource(TestApi, '/test-api/<int:number>')
api.add_resource(UsersApi, '/users')
api.add_resource(UserApi, '/users/<string:authId>')
api.add_resource(NutzerByNameApi, '/nutzer-by-name/<string:name>')

api.add_ressource(LerngruppeApi, '/lerngruppe')
api.add_ressource(LerngruppeApi, '/lerngruppe/<string:name>')

if __name__ == '__main__':
    # app.run(debug=True)
    socketIo.run(app, debug=True)
