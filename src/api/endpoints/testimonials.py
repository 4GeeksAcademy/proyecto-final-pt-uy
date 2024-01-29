from flask import Flask, request, jsonify, Blueprint
from api.models import Adoption_Users, db, Testimony
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from cloudinary import config as cloudinary_config, uploader

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

# Función para eliminar una imagen de Cloudinary
def delete_image(image_url):
    """
    Parámetro:
        - image_url: URL de la imagen en Cloudinary.
    """
    public_id = image_url.split("/")[-1].split(".")[0]
    uploader.destroy(public_id)



########################### TESTIMONIALS ROUTES #########################
# ================= Registrar testimonio de adopción ================== #
@testimonials_bp.route('/testimonio', methods=['POST'])
@jwt_required()
def register_adoption_testimony():
    """
    Registra un testimonio de adopción para un usuario que ha adoptado a un animal.
    
    Endpoint:
        POST testimonios/testimonio

    Parámetros de la Solicitud (multipart/form-data):
        - testimony_text: Texto del testimonio (máximo 400 caracteres, requerido).
        - image: Archivo de imagen adjunto (opcional).
        - animal_id: ID del animal adoptado (requerido).

    Cabeceras:
        - Authorization: Token JWT del usuario logeado.

    Respuestas:
        - 201: Testimonio registrado exitosamente.
        - 400: Error en la solicitud (campos faltantes o inválidos).
        - 403: El usuario no ha adoptado al animal especificado.
        - 400: Ya hay un testimonio registrado para esta adopción.
    """
    current_user_id = get_jwt_identity()

    # Obtener datos de la solicitud
    data = request.form
    testimony_text = data.get('testimony_text')
    image_file = request.files.get('image')
    animal_id = data.get('animal_id')

    # Validar que los campos requeridos estén presentes en la solicitud
    if not testimony_text:
        return jsonify({"msg": "El texto del testimonio es requerido"}), 400
    if len(testimony_text) > 400:
        return jsonify({"msg": "El texto del testimonio es demasiado largo (máximo permitido: 400 caracteres)"}), 400
    if not animal_id:
        return jsonify({"msg": "Se id del animal adoptado es requerido"}), 400

    # Verificar que el usuario logeado haya adoptado al animal especificado
    adoption = Adoption_Users.query.filter_by(user_id=current_user_id, animal_id=animal_id).first()

    if not adoption:
        return jsonify({"msg": "El usuario no ha adoptado al animal especificado"}), 403

    # Verificar si ya hay un testimonio asociado a la adopción
    if adoption.testimony_relationship:
        return jsonify({"msg": "Ya hay un testimonio registrado para esta adopción"}), 400

    # Subir la imagen a Cloudinary si se proporciona
    image_url = None
    if image_file:
        response = uploader.upload(image_file)  # Subir la imagen a Cloudinary
        image_url = response['secure_url']

    # Crear el objeto Testimony y guardarlo en la base de datos
    new_testimony = Testimony(testimony_text=testimony_text, image_url=image_url, adoption_id=adoption.id)
    db.session.add(new_testimony)
    db.session.commit()

    return jsonify({"msg": "Testimonio registrado exitosamente"}), 201



# ================= Get all testimonials ================== #
@testimonials_bp.route('/', methods=['GET'])
@jwt_required()
def get_testimonials():
    testimonials = Testimony.query.all()
    
    return jsonify([testimony.serialize() for testimony in testimonials]), 200

  

# ================= Get one testimony by id ================== #
@testimonials_bp.route('/testimonio/<int:testimony_id>', methods=['GET'])
def get_testimony(testimony_id):
    testimony = Testimony.query.get(testimony_id)
    if testimony is None:
        return jsonify({"message": "Testimonio no encontrado"}), 404
    
    return jsonify(testimony.serialize()), 200



# ================= Eliminar testimonio de adopción ================== #
@testimonials_bp.route('/testimonio/<int:testimony_id>', methods=['DELETE'])
@jwt_required()
def delete_adoption_testimony(testimony_id):
    """
    Elimina un testimonio de adopción.

    Endpoint:
        DELETE /testimonios/testimonio/<int:testimony_id>

    Parámetros de la Solicitud:
        - testimony_id: ID del testimonio a eliminar.

    Cabeceras:
        - Authorization: Token JWT del usuario logeado.

    Respuestas:
        - 204: Testimonio eliminado exitosamente.
        - 403: El usuario no tiene permisos para eliminar este testimonio.
        - 404: Testimonio no encontrado.
    """
    current_user_id = get_jwt_identity()

    # Verificar si el testimonio existe
    testimony = Testimony.query.filter_by(id=testimony_id).first()

    if not testimony:
        return jsonify({"msg": "Testimonio no encontrado"}), 404

    # Verificar si el usuario tiene permisos para eliminar el testimonio
    adoption = Adoption_Users.query.get(testimony.adoption_id)
    allowed_to_modify = adoption.user_id == current_user_id
    if not allowed_to_modify:
        return jsonify({"msg": "No tienes permiso para eliminar este testimonio"}), 403

    # Eliminar la imagen de Cloudinary si está presente
    if testimony.image_url:
        delete_image(testimony.image_url)

    # Eliminar el testimonio de la base de datos
    db.session.delete(testimony)
    db.session.commit()

    return jsonify({"msg": "Testimonio eliminado exitosamente"}), 204




# ================= Modificar testimonio de adopción ================== #
@testimonials_bp.route('/testimonio/<int:testimony_id>', methods=['PUT'])
@jwt_required()
def update_adoption_testimony(testimony_id):
    """
    Modifica un testimonio de adopción existente.

    Endpoint:
        PUT testimonios/testimonio/<testimony_id>

    Parámetros de la Solicitud (multipart/form-data):
        - testimony_text: Texto del testimonio (máximo 400 caracteres, requerido).
        - image: Archivo de imagen adjunto (opcional).

    Cabeceras:
        - Authorization: Token JWT del usuario logeado.

    Respuestas:
        - 200: Testimonio modificado exitosamente.
        - 400: Error en la solicitud (campos faltantes o inválidos).
        - 403: El usuario no tiene permiso para modificar este testimonio.
        - 404: Testimonio no encontrado.
    """
    current_user_id = get_jwt_identity()

    # Obtener el testimonio de la base de datos
    testimony = Testimony.query.get(testimony_id)

    # Verificar si el testimonio existe
    if not testimony:
        return jsonify({"msg": "Testimonio no encontrado"}), 404

    # Verificar si el usuario tiene permiso para modificar este testimonio
    adoption = Adoption_Users.query.get(testimony.adoption_id)
    allowed_to_modify = adoption.user_id == current_user_id
    if not allowed_to_modify:
        return jsonify({"msg": "No tienes permiso para modificar este testimonio"}), 403

    # Obtener datos de la solicitud
    data = request.form
    testimony_text = data.get('testimony_text')
    image_file = request.files.get('image')

    # Validar que los campos requeridos estén presentes en la solicitud
    if not testimony_text:
        return jsonify({"msg": "El texto del testimonio es requerido"}), 400
    if len(testimony_text) > 400:
        return jsonify({"msg": "El texto del testimonio es demasiado largo (máximo permitido: 400 caracteres)"}), 400

    # Si se proporciona una imagen
    if image_file:
        # Eliminar la imagen anterior de Cloudinary si está presente
        if testimony.image_url:
            delete_image(testimony.image_url)

        # Subir la nueva imagen a Cloudinary
        response = uploader.upload(image_file)  
        testimony.image_url = response['secure_url']

    # Modificar el testimonio y guardar en la base de datos
    testimony.testimony_text = testimony_text
    db.session.commit()

    return jsonify({"msg": "Testimonio modificado exitosamente"}), 200