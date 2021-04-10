from flask import Flask
from flask_restx import Api, fields
from server.bo.User import User

app = Flask(__name__)
api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute=lambda x: x.get_id(), description='Der Unique Identifier eines Business Object'),
})

"""Users, Customers, Accounts & Transactions sind BusinessObjects..."""
user = api.inherit('User', bo, {
    'name': fields.String(attribute=lambda x: x.get_name(), description='Name eines Benutzers'),
    'email': fields.String(attribute=lambda x: x.get_email(), description='E-Mail-Adresse eines Benutzers')
})
