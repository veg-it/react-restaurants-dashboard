from flask import Flask, request
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from models import db, Restaurant, Order, Category, Product, User, VacancyRequest, Vacancy, Review, Promotion, Menu, MenuItem
from flask_restful import Api
from flask_cors import CORS

from restaurant_resource import RestaurantResource, RestaurantResourceById
from category_resource import CategoryResource, CategoryResourceById
from promotion_resource import PromotionResource, PromotionResourceById
from product_resource import ProductResource, ProductResourceById
from order_resource import OrderResource, OrderResourceById
from menu_resource import MenuResource, MenuResourceById
from vacancyrequest_resource import VacancyrequestResource, VacancyrequestResourceById
from review_resource import ReviewResourceById, ReviewResource
from vacancy_resource import VacancyResource, VacancyResourceById
from user_resource import UserResource, UserResourceById

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, resources={r"/*": {"origins": "*"}})

db.init_app(app)

with app.app_context():
    db.create_all()

admin = Admin(app)

admin.add_view(ModelView(Restaurant, db.session))
admin.add_view(ModelView(Order, db.session))
admin.add_view(ModelView(Category, db.session))
admin.add_view(ModelView(Product, db.session))
admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(VacancyRequest, db.session))
admin.add_view(ModelView(Vacancy, db.session))
admin.add_view(ModelView(Review, db.session))
admin.add_view(ModelView(Promotion, db.session))
admin.add_view(ModelView(Menu, db.session))
admin.add_view(ModelView(MenuItem, db.session))

api = Api(app)

api.add_resource(RestaurantResource, '/restaurants')
api.add_resource(RestaurantResourceById, '/restaurants/<int:id>')
api.add_resource(CategoryResource, '/categories')
api.add_resource(CategoryResourceById, '/categories/<int:id>')
api.add_resource(ProductResource, '/products')
api.add_resource(ProductResourceById, '/products/<int:id>')
api.add_resource(OrderResource, '/orders')
api.add_resource(OrderResourceById, '/orders/<int:id>')
api.add_resource(PromotionResource, '/promotions')
api.add_resource(PromotionResourceById, '/promotions/<int:id>')
api.add_resource(MenuResource, '/menus')
api.add_resource(MenuResourceById, '/menus/<int:id>')
api.add_resource(VacancyrequestResource, '/vacancyrequest')
api.add_resource(VacancyrequestResourceById, '/vacancyrequest/<int:id>')
api.add_resource(ReviewResource, '/reviews')
api.add_resource(ReviewResourceById, '/reviews/<int:id>')
api.add_resource(VacancyResource, '/vacancies')
api.add_resource(VacancyResourceById, '/vacancies/<int:id>')
api.add_resource(UserResource, '/users')
api.add_resource(UserResourceById, '/users/<int:id>')

if __name__ == '__main__':
    app.run()
