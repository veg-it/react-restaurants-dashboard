from flask_restful import Resource, reqparse
from models import db, Menu, MenuItem, Promotion
from flask import request

class MenuResource(Resource):
    def get(self):
        menus = Menu.query.all()
        return {'menus': [menu.serialize for menu in menus]}, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('restaurant_id', type=int, required=True, location='json')
        parser.add_argument('product_ids', type=list, location='json', required=True)
        args = parser.parse_args()

        menu = Menu(restaurant_id=args['restaurant_id'])
        db.session.add(menu)
        db.session.flush()

        for product_id in args['product_ids']:
            menu_item = MenuItem(product_id=product_id, menu_id=menu.id)
            db.session.add(menu_item)

        db.session.commit()

        return {'message': 'Menu created', 'menu': menu.serialize}, 201

class MenuResourceById(Resource):
    def get(self, id):
        menu = Menu.query.filter_by(restaurant_id=id).first()

        result = {
            'menu': menu.serialize,
        }

        return result, 200

    def put(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('restaurant_id', type=int, location='json', required=True)
        parser.add_argument('product_ids', type=list, location='json')
        args = parser.parse_args()

        menu = Menu.query.get_or_404(id)

        if args['restaurant_id'] is not None:
            menu.restaurant_id = args['restaurant_id']

        if args['product_ids'] is not None:
            MenuItem.query.filter_by(menu_id=id).delete()
            for product_id in args['product_ids']:
                menu_item = MenuItem(product_id=product_id, menu_id=id)
                db.session.add(menu_item)

        db.session.commit()

        return {'message': 'Menu updated', 'menu': menu.serialize}, 200


    def delete(self, id):
        menu = Menu.query.get_or_404(id)
        MenuItem.query.filter_by(menu_id=id).delete()
        db.session.delete(menu)
        db.session.commit()

        return {'message': 'Menu deleted'}, 200
