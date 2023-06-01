from flask import request
from flask_restful import Resource
from models import db, Review

class ReviewResource(Resource):
    def get(self):
        reviews = Review.query.all()
        return [review.serialize for review in reviews]

    def post(self):
        data = request.get_json()
        new_review = Review(text=data['text'])
        db.session.add(new_review)
        db.session.commit()
        return [new_review.serialize], 201

class ReviewResourceById(Resource):
    def get(self, id):
        review = Review.query.get(id)
        if review is None:
            return {'error': 'review not found'}, 404
        return [review.serialize]

    def put(self, id):
        data = request.get_json()
        review = Review.query.get(id)
        if review is None:
            return {'error': 'review not found'}, 404
        review.text = data['text']
        db.session.commit()
        return [review.serialize]

    def delete(self, id):
        review = Review.query.get(id)
        if review is None:
            return {'error': 'review not found'}, 404
        db.session.delete(review)
        db.session.commit()
        return {'result': 'review deleted'}