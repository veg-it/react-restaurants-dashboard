from flask import request
from flask_restful import Resource
from models import db, VacancyRequest
from datetime import datetime

class VacancyrequestResource(Resource):
    def get(self):
        vacancyrequests = VacancyRequest.query.all()
        return [vacancyrequest.serialize for vacancyrequest in vacancyrequests]

    def post(self):
        data = request.get_json()
        date = datetime.fromtimestamp(int(data['date']))
        new_vacancyrequest = VacancyRequest(firstname=data['firstname'], lastname=data['lastname'], phone=data['phone'], date=date, text=data['text'])
        db.session.add(new_vacancyrequest)
        db.session.commit()
        return [new_vacancyrequest.serialize], 201

class VacancyrequestResourceById(Resource):
    def get(self, id):
        vacancyrequest = VacancyRequest.query.get(id)
        if vacancyrequest is None:
            return {'error': 'restaurant not found'}, 404
        return [vacancyrequest.serialize]

    def put(self, id):
        data = request.get_json()
        vacancyrequest = VacancyRequest.query.get(id)
        if vacancyrequest is None:
            return {'error': 'vacancyrequest not found'}, 404
        date = datetime.fromtimestamp(int(data['date']))
        vacancyrequest.firstname = data['firstname']
        vacancyrequest.lastname = data['lastname']
        vacancyrequest.phone = data['phone']
        vacancyrequest.date = date
        vacancyrequest.text = data['text']
        db.session.commit()
        return [vacancyrequest.serialize]

    def delete(self, id):
        vacancyrequest = VacancyRequest.query.get(id)
        if vacancyrequest is None:
            return {'error': 'vacancyrequest not found'}, 404
        db.session.delete(vacancyrequest)
        db.session.commit()
        return {'result': 'vacancyrequest deleted'}