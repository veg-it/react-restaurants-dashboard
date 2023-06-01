from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    menus = db.relationship('Menu', backref='restaurant', lazy=True)
    orders = db.relationship('Order', backref='restaurant', lazy=True)
    promotions = db.relationship('Promotion', backref='restaurant', lazy=True)
    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address
        }

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    product = db.relationship('Product')
    @property
    def serialize(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'order_id': self.order_id,
            'quantity': self.quantity,
            'product': self.product.serialize if self.product else None
        }

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(20), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    sum = db.Column(db.Float, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    shipping_type = db.Column(db.String(50), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    items = db.relationship('OrderItem', backref='order', lazy=True)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'status': self.status,
            'date': self.date.isoformat() if self.date else None,
            'sum': self.sum,
            'comment': self.comment,
            'shipping_type': self.shipping_type,
            'restaurant_id': self.restaurant_id,
            'products': [item.product.serialize for item in self.items if item.product is not None]
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    products = db.relationship('Product', backref='category', lazy=True)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'products': [product.serialize for product in self.products]
        }

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(200), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    promotions = db.relationship('Promotion', backref='product_promotions', lazy=True)

    @property
    def serialize(self):
        discount = None
        if self.promotions:
            discount = self.promotions[0].discount  # if a product has multiple promotions, this picks the first one
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'image': self.image,
            'category_id': self.category_id,
            'discount': discount
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    login = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    @property
    def serialize(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'phone': self.phone,
            'address': self.address,
            'login': self.login,
            'password': self.password,
            'email': self.email,
            'role': self.role,
        }

class VacancyRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    text = db.Column(db.Text, nullable=True)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'phone': self.phone,
            'date': self.date.isoformat(),
            'text': self.text,
        }

class Vacancy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'text': self.text,
        }

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'text': self.text,
        }

class Promotion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    discount = db.Column(db.Float, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    product = db.relationship('Product')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'discount': self.discount,
            'product_id': self.product_id,
            'restaurant_id': self.restaurant_id,
            'product': self.product.serialize if self.product else None
        }

class Menu(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    menu_items = db.relationship('MenuItem', backref='menu', lazy=True)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'products': [menu_item.product.serialize for menu_item in self.menu_items if menu_item.product is not None]
        }

class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    menu_id = db.Column(db.Integer, db.ForeignKey('menu.id'), nullable=False)
    product = db.relationship('Product')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'menu_id': self.menu_id,
            'product': self.product.serialize if self.product else None
        }

