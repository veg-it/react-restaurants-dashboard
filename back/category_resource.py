from flask import request
from flask_restful import Resource
from models import db, Category

class CategoryResource(Resource):
    def get(self):
        categories = Category.query.all()
        return [{'id': category.id, 'name': category.name} for category in categories]

    def post(self):
        data = request.get_json()
        new_category = Category(name=data['name'])
        db.session.add(new_category)
        db.session.commit()
        return {'id': new_category.id, 'name': new_category.name}, 201

class CategoryResourceById(Resource):
    def get(self, id):
        category = Category.query.get(id)
        if category is None:
            return {'error': 'category not found'}, 404
        return {'id': category.id, 'name': category.name}

    def put(self, id):
        data = request.get_json()
        category = Category.query.get(id)
        if category is None:
            return {'error': 'category not found'}, 404
        category.name = data['name']
        db.session.commit()
        return {'id': category.id, 'name': category.name}

    def delete(self, id):
        category = Category.query.get(id)
        if category is None:
            return {'error': 'category not found'}, 404
        db.session.delete(category)
        db.session.commit()
        return {'result': 'category deleted'}