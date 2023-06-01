from flask import request
from flask_restful import Resource
from models import db, User

class UserResource(Resource):
    def get(self):
        users = User.query.all()
        return [user.serialize for user in users]

    def post(self):
        data = request.get_json()
        new_User = User(firstname=data['firstname'], lastname=data['lastname'], phone=data['phone'], address=data['address'], login=data['login'], password=data['password'], email=data['email'], role=data['role'])
        db.session.add(new_User)
        db.session.commit()
        return [new_User.serialize], 201

class UserResourceById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user is None:
            return {'error': 'User not found'}, 404
        return [user.serialize]

    def put(self, id):
        data = request.get_json()
        user = User.query.get(id)
        if user is None:
            return {'error': 'User not found'}, 404
        user.firstname = data['firstname']
        user.lastname = data['lastname']
        user.phone = data['phone']
        user.address = data['address']
        user.login = data['login']
        user.email = data['email']
        user.password = data['password']
        user.role = data['role']
        db.session.commit()
        return [user.serialize]

    def delete(self, id):
        user = User.query.get(id)
        if user is None:
            return {'error': 'User not found'}, 404
        db.session.delete(User)
        db.session.commit()
        return {'result': 'User deleted'}