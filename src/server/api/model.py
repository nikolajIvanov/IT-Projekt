from flask import Flask
from flask_restx import Api, fields

app = Flask(__name__)
api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
})

"""Users, Customers, Accounts & Transactions sind BusinessObjects..."""
user = api.inherit('User', bo, {
    'name': fields.String(attribute='_name', description='Name eines Benutzers'),
    'email': fields.String(attribute='_email', description='E-Mail-Adresse eines Benutzers')
})
