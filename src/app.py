# Import aller Nötigen Flask Packages
from flask import Flask
from flask_restx import Api
from flask_cors import CORS

# Api Endpunkte
from server.api.test_api import TestApi
from server.api.UserListApi import UserListApi
from server.api.UserApi import UserApi
from server.api.UserByNameApi import UserByNameApi
app = Flask(__name__)

CORS(app, resources=r'/*')

api = Api(app)

# Api Endpunkte werden mit der Funktion add_resource an Flask übergeben
api.add_resource(TestApi, '/test-api/<int:number>')
api.add_resource(UserListApi, '/users')
api.add_resource(UserApi, '/user/<int:nummer>')
api.add_resource(UserByNameApi, '/user-by-name/<string:name>')

if __name__ == '__main__':
    app.run(debug=True)
