"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Testimony
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



 ######## testimony routes ##########
@api.route('/testimony', methods=['POST'])
@jwt_required()
def create_testimony():
    body = request.get_json()

    if 'testimony' not in body:
        return jsonify({"msg": "Falta el testimonio"}), 400
  
    if 'url' not in body:
        return jsonify({"msg": "Falta la imagen"}), 400

    if 'animal_id' not in body:
        return jsonify({"msg": "Falta el ID del animal"}), 400
    
   
    new_testimony = Testimony(
        testimony_text=body['testimony'],
        image_url=body['url'],
        animal_id=body['animal_id']
    )
    
    db.session.add(new_testimony)
    db.session.commit()

    return jsonify({"message": "Testimony created successfully"}), 201



@api.route('/testimony', methods=['GET'])
@jwt_required()
def get_testimonies():
    testimonies = Testimony.query.all()
    return jsonify([testimony.serialize() for testimony in testimonies]), 200
    


@api.route('/testimony/<int:testimony_id>', methods=['GET'])
def get_testimony(testimony_id):
    testimony = Testimony.query.get(testimony_id)
    if testimony is None:
        return jsonify({"message": "Testimony not found"}), 404
    return jsonify(testimony.serialize()), 200



@api.route('/testimony/<int:testimony_id>', methods=['DELETE'])
@jwt_required()
def delete_testimony(testimony_id):
    testimony = Testimony.query.get(testimony_id)
    if testimony is None :
        return jsonify({"msg":"Testimony not found"}),404

    db.session.delete(testimony)
    db.session.commit()
    return jsonify({"msg":"Testimony deleted successfully"}),200

#####Queda pendiente a desarrollo en el FrontEnd########
@api.route('/testimony/<int:testimony_id>', methods=['PUT'])
@jwt_required()
def update_testimony(testimony_id):
    testimony = Testimony.query.get(testimony_id)
    if testimony is None:
        return jsonify({"message": "Testimony not found"}), 404

    data = request.get_json()
    testimony.animal_id = data.get('animal_id', testimony.animal_id)
    testimony.testimony_text = data.get('testimony_text', testimony.testimony_text)
    testimony.image_url = data.get('image_url', testimony.image_url)

    db.session.commit()
    return jsonify({"message": "Testimony updated successfully"}), 200

##########################################################################################