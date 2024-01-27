"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Testimony, Animals, Animals_images, Adoption_Users
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required
from cloudinary import config as cloudinary_config
from cloudinary.uploader import upload

from dotenv import load_dotenv
import os

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Configurar Cloudinary
cloudinary_config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)


@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#################### USERS ROUTES ###################
# ================== Get all users ================ #
@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users_query = User.query.all()

    serialized_users = []
    for user in users_query:
        # Obtener la lista de animales adoptados por el usuario
        adopted_animals = Adoption_Users.query.filter_by(user_id=user.id).all()

        # Serializar la información del usuario y la lista de animales adoptados
        user_info = user.serialize()
        adopted_animals_info = [adoption.serialize() for adoption in adopted_animals]

        # Agregar la lista de animales adoptados al diccionario del usuario
        user_info["adopted_animals"] = adopted_animals_info

        serialized_users.append(user_info)

    response_body = {
        "msg": "ok",
        "total_users": len(serialized_users),
        "result": serialized_users
    }

    return jsonify(response_body), 200


# ================= Get one user by id ================= #
@api.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Obtener la lista de animales adoptados por el usuario
    adopted_animals = Adoption_Users.query.filter_by(user_id=user_id).all()

    # Serializar la información del usuario y la lista de animales adoptados
    user_info = user.serialize()
    adopted_animals_info = [adoption.serialize() for adoption in adopted_animals]

    # Agregar la lista de animales adoptados al diccionario del usuario
    user_info["adopted_animals"] = adopted_animals_info

    return jsonify(user_info), 200


# ================= Modify one user by id ================= #
@api.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()

    # Campos obligatorios
    if 'name' in data:
        user.name = data['name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'user_name' in data:
        user.user_name = data['user_name']
    if 'email' in data:
        user.email = data['email']
    if 'role' in data:
        user.role = data['role']

    # Campos opcionales
    if 'address' in data:
        user.address = data['address']
    if 'phone_number' in data:
        user.phone_number = data['phone_number']
    if 'backyard' in data:
        user.backyard = data['backyard']
    if 'other_pets' in data:
        user.other_pets = data['other_pets']

    db.session.commit()

    return jsonify({"message": "User updated successfully"}), 200



##################### TESTIMONIALS ROUTES #####################
# ================= Register one testimony ================== #
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


# ================= Get all testimonials ================== #
@api.route('/testimonials', methods=['GET'])
@jwt_required()
def get_testimonies():
    testimonies = Testimony.query.all()
    return jsonify([testimony.serialize() for testimony in testimonies]), 200
    

# ================= Get one testimony by id ================== #
@api.route('/testimony/<int:testimony_id>', methods=['GET'])
def get_testimony(testimony_id):
    testimony = Testimony.query.get(testimony_id)
    if testimony is None:
        return jsonify({"message": "Testimony not found"}), 404
    return jsonify(testimony.serialize()), 200


# ================= Delete one testimony ================== #
@api.route('/testimony/<int:testimony_id>', methods=['DELETE'])
@jwt_required()
def delete_testimony(testimony_id):
    testimony = Testimony.query.get(testimony_id)
    if testimony is None :
        return jsonify({"msg":"Testimony not found"}),404

    db.session.delete(testimony)
    db.session.commit()
    return jsonify({"msg":"Testimony deleted successfully"}),200


# ================= Modify one testimony by id ================= #
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



##################### ANIMALS ROUTES #####################
# =============== Register an Animal =================== #
@api.route('/animal', methods=['POST'])
@jwt_required()
def register_animal():
    # Obtener datos del formulario
    animal_data = request.form
    print(request.form)

    # Obtener imágenes del formulario
    images = request.files.getlist('images')

    if not animal_data:
        return jsonify({"msg": "Error: the request does not include the required data"}), 400

    required_fields = ['name', 'type', 'birth_date']

    for field in required_fields:
        if field not in animal_data:
            return jsonify({'msg': f'The field {field} is required'}), 400

    animal = Animals()
    animal.name = animal_data['name']
    animal.type = animal_data['type']
    animal.birth_date = animal_data['birth_date']

    # Campos opcionales
    if 'size' in animal_data:
        animal.size = animal_data['size']
    if 'gender' in animal_data:
        animal.gender = animal_data['gender']
    if 'vaccinated' in animal_data:
        animal.vaccinated = animal_data['vaccinated']
    if 'castrated' in animal_data:
        animal.castrated = animal_data['castrated']
    if 'dewormed' in animal_data:
        animal.dewormed = animal_data['dewormed']
    if 'microchip' in animal_data:
        animal.microchip = animal_data['microchip']
    if 'publication_date' in animal_data:
        animal.publication_date = animal_data['publication_date']
    if 'additional_information' in animal_data:
        animal.additional_information = animal_data['additional_information']
    if 'status' in animal_data:
        animal.status = animal_data['status']

    try:
        db.session.add(animal)
        db.session.commit()

        # Acceder al id asignado después de confirmar en la base de datos
        db.session.refresh(animal)  # Refrescar el objeto desde la base de datos para obtener el id
        animal.identification_code = f'R{animal.type[0].capitalize()}{animal.id:04d}'
        db.session.commit()

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error while saving to the database: {str(e)}"}), 500

    # Gestionar las imágenes y almacenarlas en Cloudinary
    image_urls = []  # Lista para almacenar las URLs de las imágenes

    for image in images:
        upload_response = upload(image)  # Subir la imagen a Cloudinary
        image_urls.append(upload_response['secure_url'])  # Obtener la URL y agregarla a la lista

        # Almacenar la información de la imagen en la base de datos
        animal_image = Animals_images(image_url=upload_response['secure_url'], public_id=upload_response['public_id'], animal_id=animal.id)
        db.session.add(animal_image)
        db.session.commit()

    serialized_animal = animal.serialize()

    # Agregar las URLs de las imágenes a la respuesta
    serialized_animal['image_urls'] = image_urls

    response_body = {
        "msg": "ok",
        "result": serialized_animal
    }

    return jsonify(response_body), 201


# =============== Get All Animals ================== #
@api.route('/animals', methods=['GET'])
@jwt_required()
def get_animals():
    animals_query = Animals.query.all()
    serialized_animals = []

    for animal in animals_query:
        # Serializar el animal
        serialized_animal = animal.serialize()

        # Obtener las imágenes asociadas al animal
        images_query = Animals_images.query.filter_by(animal_id=animal.id).all()

        # Obtener solo las URL de las imágenes
        image_urls = [image.image_url for image in images_query]

        # Agregar las URLs al objeto del animal
        serialized_animal['image_urls'] = image_urls

        # Agregar el animal serializado a la lista resultante
        serialized_animals.append(serialized_animal)

    response_body = {
         "msg": "ok",
         "total_animals": len(serialized_animals),
         "result": serialized_animals
     }
    
    return jsonify(response_body), 200


# =============== Get One Animal by Id ================== #
@api.route('/animal/<int:animal_id>', methods=['GET'])
@jwt_required()
def get_animal(animal_id):
    animal = Animals.query.get(animal_id)

    if not animal:
        return jsonify({"message": "Animal not found"}), 404
    
    # Serializar el animal
    serialized_animal = animal.serialize()

    # Obtener las imágenes asociadas al animal
    images_query = Animals_images.query.filter_by(animal_id=animal.id).all()

    # Obtener solo las URL de las imágenes
    image_urls = [image.image_url for image in images_query]

    # Agregar las URLs al objeto del animal
    serialized_animal['image_urls'] = image_urls

    return jsonify(serialized_animal), 200


