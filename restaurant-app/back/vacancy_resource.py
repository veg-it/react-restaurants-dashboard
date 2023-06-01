from flask import request
from flask_restful import Resource
from models import db, Vacancy

class VacancyResource(Resource):
    def get(self):
        vacancys = Vacancy.query.all()
        return [vacancy.serialize for vacancy in vacancys]

    def post(self):
        data = request.get_json()
        new_vacancy = Vacancy(text=data['text'])
        db.session.add(new_vacancy)
        db.session.commit()
        return [new_vacancy.serialize], 201

class VacancyResourceById(Resource):
    def get(self, id):
        vacancy = Vacancy.query.get(id)
        if vacancy is None:
            return {'error': 'vacancy not found'}, 404
        return [vacancy.serialize]

    def put(self, id):
        data = request.get_json()
        vacancy = Vacancy.query.get(id)
        if vacancy is None:
            return {'error': 'vacancy not found'}, 404
        vacancy.text = data['text']
        db.session.commit()
        return [vacancy.serialize]

    def delete(self, id):
        vacancy = Vacancy.query.get(id)
        if vacancy is None:
            return {'error': 'vacancy not found'}, 404
        db.session.delete(vacancy)
        db.session.commit()
        return {'result': 'vacancy deleted'}