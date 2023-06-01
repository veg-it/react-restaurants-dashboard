from flask import request
from flask_restful import Resource
from models import db, Promotion

class PromotionResource(Resource):
    def get(self):
        promotions = Promotion.query.all()
        return [{'id': promotion.id, 'name': promotion.name, 'discount': promotion.discount, 'product_id': promotion.product_id, 'restaurant_id': promotion.restaurant_id} for promotion in promotions]

    def post(self):
        data = request.get_json()
        new_promotion = Promotion(name=data['name'], discount=data['discount'], product_id=data['product_id'], restaurant_id=data['restaurant_id'])
        db.session.add(new_promotion)
        db.session.commit()
        return {'id': new_promotion.id, 'name': new_promotion.name, 'discount': new_promotion.discount, 'product_id': new_promotion.product_id, 'restaurant_id': new_promotion.restaurant_id}, 201

class PromotionResourceById(Resource):
    def get(self, id):
        promotion = Promotion.query.get(id)
        if promotion is None:
            return {'error': 'promotion not found'}, 404
        return {'id': promotion.id, 'name': promotion.name, 'discount': promotion.discount, 'product_id': promotion.product_id, 'restaurant_id': promotion.restaurant_id}

    def put(self, id):
        data = request.get_json()
        promotion = Promotion.query.get(id)
        if promotion is None:
            return {'error': 'promotion not found'}, 404
        promotion.name = data['name']
        promotion.discount = data['discount']
        promotion.product_id = data['product_id']
        promotion.restaurant_id = data['restaurant_id']
        db.session.commit()
        return {'id': promotion.id, 'name': promotion.name, 'discount': promotion.discount, 'product_id': promotion.product_id, 'restaurant_id': promotion.restaurant_id}

    def delete(self, id):
        promotion = Promotion.query.get(id)
        if promotion is None:
            return {'error': 'promotion not found'}, 404
        db.session.delete(promotion)
        db.session.commit()
        return {'result': 'promotion deleted'}