# Import aller Nötigen Flask Packages
from flask import Flask
from flask_restx import Api
from flask_cors import CORS
from flask_socketio import SocketIO, send
# Api Endpunkte
from server.api.test_api import TestApi
from server.api.NutzerListApi import NutzerListApi
from server.api.NutzerApi import NutzerApi
from server.api.NutzerByNameApi import NutzerByNameApi

# Flask implementierung
app = Flask(__name__)

CORS(app, resources=r'/*')

api = Api(app)
socketIo = SocketIO(app, cors_allowed_origins="*")


@socketIo.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    return None

# Api Endpunkte werden mit der Funktion add_resource an Flask übergeben
api.add_resource(TestApi, '/test-api/<int:number>')
api.add_resource(NutzerListApi, '/users')
api.add_resource(NutzerApi, '/nutzer/<int:id>')
api.add_resource(NutzerByNameApi, '/nutzer-by-name/<string:name>')

if __name__ == '__main__':
    # app.run(debug=True)
    socketIo.run(app, debug=True)
