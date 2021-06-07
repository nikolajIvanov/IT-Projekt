# Import aller Nötigen Flask Packages
from flask_cors import CORS
from flask_socketio import SocketIO, send
# Api Endpunkte
from server.api.VieleUserApi import VieleUserApi
from server.api.test_api import TestApi
from server.api.UsersApi import UsersApi
from server.api.UserApi import UserApi
from server.api.LerngruppeApi import LerngruppeApi
from server.api.LerngruppenApi import LerngruppenApi
from server.api.LerngruppenmitgliedApi import LerngruppenmitgliedApi
from server.api.model import api, app
from server.api.StudiengangApi import StudiengangApi
from server.api.ModulApi import ModulApi
from server.api.LerntypApi import LerntypApi


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
api.add_resource(VieleUserApi, '/viele-user')

api.add_resource(LerngruppenApi, '/lerngruppen')
api.add_resource(LerngruppeApi, '/lerngruppe/<int:id>')
api.add_resource(LerngruppenmitgliedApi, '/lerngruppen-mitglied')

api.add_resource(StudiengangApi, '/studiengang')
api.add_resource(ModulApi, '/modul/<string:studiengang>')
api.add_resource(LerntypApi, '/lerntyp')

if __name__ == '__main__':
    # app.run(debug=True)
    socketIo.run(app, debug=True)
