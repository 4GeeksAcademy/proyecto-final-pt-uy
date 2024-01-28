from flask import Flask, request, jsonify, Blueprint
from api.models import db, Testimony
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from cloudinary import config as cloudinary_config
from cloudinary.uploader import upload

from dotenv import load_dotenv
import os

testimonials_bp = Blueprint('testimonios', __name__)

# Allow CORS requests to this API
CORS(testimonials_bp)

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Configurar Cloudinary
cloudinary_config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)



##################### TESTIMONIALS ROUTES #####################
# ================= Register one testimony ================== #
@testimonials_bp.route('/testimonio', methods=['POST'])
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


# ================= Get all testimonials ================== #
@testimonials_bp.route('/', methods=['GET'])
@jwt_required()
def get_testimonies():
    testimonies = Testimony.query.all()
    return jsonify([testimony.serialize() for testimony in testimonies]), 200
    

# ================= Get one testimony by id ================== #
@testimonials_bp.route('/testimonio/<int:testimony_id>', methods=['GET'])
def get_testimony(testimony_id):
    testimony = Testimony.query.get(testimony_id)
    if testimony is None:
        return jsonify({"message": "Testimony not found"}), 404
    return jsonify(testimony.serialize()), 200


# ================= Delete one testimony ================== #
@testimonials_bp.route('/testimonio/<int:testimony_id>', methods=['DELETE'])
@jwt_required()
def delete_testimony(testimony_id):
    testimony = Testimony.query.get(testimony_id)
    if testimony is None :
        return jsonify({"msg":"Testimony not found"}),404

    db.session.delete(testimony)
    db.session.commit()
    return jsonify({"msg":"Testimony deleted successfully"}),200


# ================= Modify one testimony by id ================= #
@testimonials_bp.route('/testimonio/<int:testimony_id>', methods=['PUT'])
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
