from flask import request
from flask_restful import Resource
from models import db, Restaurant

class RestaurantResource(Resource):
    def get(self):
        restaurants = Restaurant.query.all()
        return [{'id': restaurant.id, 'name': restaurant.name, 'address': restaurant.address} for restaurant in restaurants]

    def post(self):
        data = request.get_json()
        new_restaurant = Restaurant(name=data['name'], address=data['address'])
        db.session.add(new_restaurant)
        db.session.commit()
        return {'id': new_restaurant.id, 'name': new_restaurant.name, 'address': new_restaurant.address}, 201

class RestaurantResourceById(Resource):
    def get(self, id):
        restaurant = Restaurant.query.get(id)
        if restaurant is None:
            return {'error': 'restaurant not found'}, 404
        return {'id': restaurant.id, 'name': restaurant.name, 'address': restaurant.address}

    def put(self, id):
        data = request.get_json()
        restaurant = Restaurant.query.get(id)
        if restaurant is None:
            return {'error': 'restaurant not found'}, 404
        restaurant.name = data['name']
        restaurant.address = data['address']
        db.session.commit()
        return {'id': restaurant.id, 'name': restaurant.name, 'address': restaurant.address}

    def delete(self, id):
        restaurant = Restaurant.query.get(id)
        if restaurant is None:
            return {'error': 'restaurant not found'}, 404
        db.session.delete(restaurant)
        db.session.commit()
        return {'result': 'restaurant deleted'}