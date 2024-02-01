from flask import Flask, request, jsonify, Blueprint
from api.models import Adoption_Users, User, db, Testimony
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.orm import joinedload
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
        - adoption_id: ID de la adopción para la cual se desea registrar un testimonio (requerido).

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
    adoption_id = data.get('adoption_id')

    # Validar que los campos requeridos estén presentes en la solicitud
    if not testimony_text or not adoption_id:
        return jsonify({"msg": "El texto del testimonio y el ID de adopción son requeridos"}), 400
    if len(testimony_text) > 400:
        return jsonify({"msg": "El texto del testimonio es demasiado largo (máximo permitido: 400 caracteres)"}), 400

    # Verificar que el usuario logeado haya adoptado al animal especificado
    adoption = Adoption_Users.query.filter_by(user_id=current_user_id, id=adoption_id).first()

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



# ================= Get testimonials list ================== #
@testimonials_bp.route('/', methods=['GET'])
def get_testimonials():
    """
    Devuelve una lista de testimonios de adopción.
    
    Endpoint:
        GET /testimonios

    Parámetros de consulta opcionales:
        - limit: Número máximo de registros a devolver (por defecto, 8).
        - status: Estado o estados de los testimonios a incluir en la respuesta (por defecto, 'approved').
    """
    # Obtener parámetros de consulta
    limit = request.args.get('limit', default=8, type=int)
    status = request.args.get('status', default='approved', type=str)

    # Validar el parámetro 'status'
    valid_statuses = ['approved', 'pending', 'rejected']
    if status not in valid_statuses:
        return jsonify({"error": "El parámetro 'status' debe ser 'approved', 'pending' o 'rejected'"}), 400

    # Obtener testimonios según los parámetros
    testimonials_query = (
        db.session.query(Testimony, Adoption_Users, User)
        .join(Adoption_Users, Adoption_Users.id == Testimony.adoption_id)
        .join(User, User.id == Adoption_Users.user_id)
        .filter(Testimony.status == status)
        .limit(limit)
        .all()
    )

    # Serializar los resultados
    serialized_testimonials = []
    for testimony, adoption, user in testimonials_query:
        serialized_testimony = testimony.serialize()

        # Obtener información del usuario asociado a la adopción
        user_info = {
            "user_id": user.id,
            "user_name": user.user_name,
            "user_email": user.email
        }

        serialized_testimony['user_info'] = user_info
        serialized_testimonials.append(serialized_testimony)

    response_body = {
        "msg": "ok",
        "total_testimonials": len(serialized_testimonials),
        "result": serialized_testimonials
    }
    
    return jsonify(response_body), 200

  

# ================= Get one testimony by id ================== #
@testimonials_bp.route('/testimonio/<int:testimony_id>', methods=['GET'])
def get_testimony(testimony_id):
    testimony = (
        db.session.query(Testimony, Adoption_Users, User)
        .filter(Testimony.id == testimony_id)
        .join(Adoption_Users, Adoption_Users.id == Testimony.adoption_id)
        .join(User, User.id == Adoption_Users.user_id)
        .first()
    )

    if testimony is None:
        return jsonify({"msg": "Testimonio no encontrado"}), 404

    # Obtener información del usuario asociado a la adopción
    user_info = {
        "user_id": testimony.User.id,
        "user_name": testimony.User.user_name,
        "user_last_name": testimony.User.last_name
    }

    # Serializar el testimonio junto con la información del usuario
    serialized_testimony = testimony.Testimony.serialize()
    serialized_testimony['user_info'] = user_info

    return jsonify(serialized_testimony), 200



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