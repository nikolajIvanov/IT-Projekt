from flask import Flask
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from server.bo.User import User

from server.Administration import Administration
from server.api.test_api import TestApi

app = Flask(__name__)

CORS(app, resources=r'/*')

api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
})

"""Users, Customers, Accounts & Transactions sind BusinessObjects..."""
user = api.inherit('User', bo, {
    'name': fields.String(attribute='_name', description='Name eines Benutzers'),
    'email': fields.String(attribute='_email', description='E-Mail-Adresse eines Benutzers')
})

@api.route('/user/<int:id>')
@api.param('id', 'Die ID des Customer-Objekts')
class User(Resource):
    @api.marshal_with(user)
    def get(self, id):
        adm = Administration()
        nutzer = adm.get_user_by_id(id)
        return nutzer

@api.route('/user-by-name/<string:name>')
class UserByName(Resource):
    #@api.marshal_with(user)
    def get(self, name):
        adm = Administration()
        nutzer = adm.get_user_by_name(name)
        return nutzer

@api.route('/test')
class Test(Resource):
    def get(self):
        adm = Administration()
        nutzer = adm.get_all_users()
        return nutzer


api.add_resource(TestApi, '/test-api/<int:number>')

if __name__ == '__main__':
    app.run(debug=True)
