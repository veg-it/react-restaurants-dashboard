from flask import request
from flask_restful import Resource
from models import db, Product

class ProductResource(Resource):
    def get(self):
        products = Product.query.all()
        return [{'id': product.id, 'name': product.name, 'price': product.price, 'image': product.image, 'category_id': product.category_id} for product in products]

    def post(self):
        data = request.get_json()
        new_product = Product(name=data['name'], price=data['price'], image=data['image'], category_id=data['category_id'])
        db.session.add(new_product)
        db.session.commit()
        return {'id': new_product.id, 'name': new_product.name, 'price': new_product.price, 'image': new_product.image, 'category_id': new_product.category_id}, 201

class ProductResourceById(Resource):
    def get(self, id):
        product = Product.query.get(id)
        if product is None:
            return {'error': 'product not found'}, 404
        return {'id': product.id, 'name': product.name, 'price': product.price, 'image': product.image, 'category_id': product.category_id}

    def put(self, id):
        data = request.get_json()
        product = Product.query.get(id)
        if product is None:
            return {'error': 'product not found'}, 404
        product.name = data['name']
        product.price = data['price']
        product.image = data['image']
        product.category_id = data['category_id']
        db.session.commit()
        return {'id': product.id, 'name': product.name, 'price': product.price, 'image': product.image, 'category_id': product.category_id}

    def delete(self, id):
        product = Product.query.get(id)
        if product is None:
            return {'error': 'product not found'}, 404
        db.session.delete(product)
        db.session.commit()
        return {'result': 'product deleted'}