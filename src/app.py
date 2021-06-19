# Import aller nötigen Flask Packages
from flask_cors import CORS
from flask_socketio import SocketIO, emit
# Api Endpunkte
from server.api.DeleteRequestApi import DeleteRequestApi
from server.api.GroupRequestApi import GroupRequestApi
from server.api.InitApi import InitApi
from server.api.VieleUserApi import VieleUserApi
from server.api.UsersApi import UsersApi
from server.api.UserApi import UserApi
from server.api.LerngruppeApi import LerngruppeApi
from server.api.LerngruppenApi import LerngruppenApi
from server.api.LerngruppenmitgliedApi import LerngruppenmitgliedApi
from server.api.model import api, app
from server.api.StudiengangApi import StudiengangApi
from server.api.ModulApi import ModulApi
from server.api.LerntypApi import LerntypApi
from server.api.UserMatchingApi import UserMatchingApi
from server.api.LerngruppenMatchingApi import LerngruppenMatchingApi
from server.api.UsersByIdApi import UsersByIdApi
from server.api.LerngruppenByIdApi import LerngruppenByIdApi
from server.api.ChatApi import ChatApi
from server.Administration import Administration
from server.api.Chat import Chat
from server.api.ChatRoomApi import ChatRoomApi
from server.api.RequestApi import RequestApi

CORS(app, resources=r'/*')
socketIo = SocketIO(app, cors_allowed_origins="*")
app.config.from_pyfile('flask.cfg', silent=True)

socketIo.on_namespace(Chat('/chat'))


@socketIo.on('usertoroom', namespace='/private')
def add_user_to_room(usertooroom):
    # Erwarte ein JSON mit den Attributen userId und roomId
    Administration.add_user_to_room(usertooroom['userId'], usertooroom['roomId'])


@socketIo.on('private_message', namespace='/private')
def nachricht(payLoad):
    room = payLoad['roomId']
    message = payLoad['message']
    sender = payLoad['userId']
    emit('new_message', message, room=room)
    Administration.save_message(room, message, sender)


@socketIo.on('roomId', namespace='/private')
def get_history(roomId):
    return Administration.get_chat_by_room(roomId)


# Api Endpunkte werden mit der Funktion add_resource an Flask übergeben
# Wird aufgerufen, wenn ein neuer User erstellt werden soll oder wenn alle User angezeigt werden sollen
api.add_resource(UsersApi, '/users')
# Gibt den aktuellen User mit allen Informationen zurück
api.add_resource(UserApi, '/users/<string:authId>')
# Wird im Matching genutzt, um bestimmte Werte für die Cards zu holen
api.add_resource(UsersByIdApi, '/usersById')
# Wird verwendet, um über Postman viele User gleichzeitig anzulegen
api.add_resource(VieleUserApi, '/viele-user')
# Erstellt oder löscht eine Lerngruppe
api.add_resource(LerngruppenApi, '/lerngruppen')
# Ruft eine Lerngruppe auf
api.add_resource(LerngruppeApi, '/lerngruppe/<int:gruppen_id>')
# Wird aufgerufen, wenn der Admin einer Lerngruppe ein neues Mitglied bestätigt
api.add_resource(LerngruppenmitgliedApi, '/lerngruppen-mitglied')
# Wird im Matching genutzt, um alle Lerngruppen zu laden, die für ein Matching infrage kommen
api.add_resource(LerngruppenByIdApi, '/lerngruppenById')
# Gibt alle Studiengänge der HdM aus
api.add_resource(StudiengangApi, '/studiengang')
# Zeigt alle Module eines Studiengangs an
api.add_resource(ModulApi, '/modul/<string:studiengang>')
# Zeigt alle Lerntypen an
api.add_resource(LerntypApi, '/lerntyp')
# Herzstück der App. Macht das Matching für die User
api.add_resource(UserMatchingApi, '/usermatch/<string:authId>')
# Herzstück der App. Macht das Matching für die Lerngruppen
api.add_resource(LerngruppenMatchingApi, '/lerngruppenmatch/<string:authId>')
# Zeigt den Chatverlauf eines Raumes an
api.add_resource(ChatApi, '/chat/<int:roomId>')
# Wird aufgerufen wenn eine User Anfrage akzeptiert wurde
api.add_resource(ChatRoomApi, '/accept_request')
# Zeigt alle Chatrooms an, die bestätigt worden sind
api.add_resource(ChatRoomApi, '/chatrooms/<string:authId>')
# Sendet einen Post Befehl der ein Argument type hat um zwischen gruppen und single unterscheiden zu können
api.add_resource(RequestApi, '/request')
# Übergibt alle Anfragen des aktuellen Users.
api.add_resource(RequestApi, '/request/<string:authId>')
# Erstellt eine Gruppenanfrage
api.add_resource(GroupRequestApi, '/group_request')
# Überprüft ob ein User in unserer Datenbank vorhanden ist
api.add_resource(InitApi, '/init/<string:authId>')
# Löscht eine Anfrage von der Datenbank
api.add_resource(DeleteRequestApi, '/delete_request')

if __name__ == '__main__':
    # app.run(debug=True)
    socketIo.run(app, debug=True)
