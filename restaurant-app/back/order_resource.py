from flask_restful import Resource, reqparse
from models import db, Order, OrderItem, Promotion
from datetime import datetime

class OrderResource(Resource):
    def get(self):
        orders = Order.query.all()
        return {'orders': [order.serialize for order in orders]}, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('status', required=True)
        parser.add_argument('date', required=True)
        parser.add_argument('sum', required=True)
        parser.add_argument('comment')
        parser.add_argument('shipping_type', required=True)
        parser.add_argument('restaurant_id', required=True, type=int)
        parser.add_argument('product_quantities', type=list, location='json', required=True)

        args = parser.parse_args()

        date = datetime.fromtimestamp(int(args['date']))

        order = Order(status=args['status'], date=date, sum=args['sum'], comment=args['comment'],
                      shipping_type=args['shipping_type'], restaurant_id=args['restaurant_id'])
        db.session.add(order)
        db.session.flush()

        for product_id, quantity in args['product_quantities']:
            order_item = OrderItem(product_id=product_id, order_id=order.id, quantity=quantity)
            db.session.add(order_item)

        db.session.commit()

        return {'message': 'Order created', 'order': order.serialize}, 201

    @staticmethod
    def get_order_with_details(order):
        order_items = OrderItem.query.filter_by(order_id=order.id).all()
        products = [item.product for item in order_items]
        promotions = [Promotion.query.filter_by(product_id=product.id).first() for product in products]

        result = {
            'order': order.serialize,
            'order_items': [item.serialize for item in order_items],
            'products': [product.serialize for product in products],
            'promotions': [promotion.serialize for promotion in promotions if promotion is not None]
        }
        return result


class OrderResourceById(Resource):
    def get(self, id):
        order = Order.query.get_or_404(id)
        return OrderResource.get_order_with_details(order), 200

    def put(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('status')
        parser.add_argument('date')
        parser.add_argument('sum')
        parser.add_argument('comment')
        parser.add_argument('shipping_type')
        parser.add_argument('restaurant_id', type=int)
        parser.add_argument('product_quantities', type=list, location='json', required=True)
        args = parser.parse_args()

        date = datetime.fromtimestamp(int(args['date'])) if args['date'] is not None else None

        order = Order.query.get_or_404(id)

        if args['status'] is not None:
            order.status = args['status']
        if args['date'] is not None:
            order.date = date
        if args['sum'] is not None:
            order.sum = args['sum']
        if args['comment'] is not None:
            order.comment = args['comment']
        if args['shipping_type'] is not None:
            order.shipping_type = args['shipping_type']
        if args['restaurant_id'] is not None:
            order.restaurant_id = args['restaurant_id']

        if args['product_quantities'] is not None:
            OrderItem.query.filter_by(order_id=id).delete()
            for product_id, quantity in args['product_quantities']:
                order_item = OrderItem(product_id=product_id, order_id=order.id, quantity=quantity)
                db.session.add(order_item)

        db.session.commit()

        return {'message': 'Order updated', 'order': OrderResource.get_order_with_details(order)}, 200



    def delete(self, id):
        order = Order.query.get_or_404(id)
        OrderItem.query.filter_by(order_id=id).delete()
        db.session.delete(order)
        db.session.commit()

        return {'message': 'Order deleted'}, 200
