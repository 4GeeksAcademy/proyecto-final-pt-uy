from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS

from api.models import Animals_images, RoleEnum, StatusEnum, Testimony, db, User, Animals, Adoption_Users

adoptions_bp = Blueprint('adopciones', __name__)

# Allow CORS requests to this API
CORS(adoptions_bp)


############################## ADOPTIONS ROUTES ##############################
# ============= Registrar Adopción (Solo para Administradores) ============= #
@adoptions_bp.route('/adopcion', methods=['POST'])
@jwt_required()
def register_adoption():
    """
    Registra una adopción.
    
    Endpoint:
        POST /adopciones/adopcion

    Requiere un token JWT de administrador para acceder.

    Parámetros de la solicitud (JSON):
    - user_id: ID del usuario adoptante.
    - animal_id: ID del animal adoptado.
    - registration_date: fecha de registro de la adopción

    Ejemplo de solicitud JSON:
    {
        "user_id": 123,
        "animal_id": 456,
        "registration_date": "2024-01-30T12:30:00.000Z"
    }

    Respuestas posibles:
    - 201: Adopción registrada exitosamente.
    - 400: Solicitud inválida o faltan campos requeridos.
    - 403: Acceso denegado (cuando el usuario no es administrador).
    - 404: Usuario o animal no encontrado.
    - 409: El animal ya tiene registrada una adopción.

    Ejemplo de respuesta JSON (éxito):
    {
        "msg": "Adopción registrada exitosamente"
    }
    """
    current_user_id = get_jwt_identity()

    # Verificar si el usuario logeado es un administrador
    current_user = User.query.get(current_user_id)
    if current_user.role != RoleEnum.ADMIN:
        return jsonify({"msg": "Acceso denegado. Se requiere rol de administrador"}), 403

    # Obtener datos de la solicitud
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar informacion en el body'}), 400

    # Validar que los campos requeridos estén presentes en la solicitud
    required_fields = ['user_id', 'animal_id', 'registration_date']
    for field in required_fields:
        if field not in body or body[field] is None:
            return jsonify({'msg': f'El campo {field} es obligatorio'}), 400

    adoption = Adoption_Users()
    adoption.user_id = body['user_id']
    adoption.animal_id = body['animal_id']
    adoption.registration_date = body['registration_date']

    # Verificar si el usuario y el animal existen en la base de datos
    user = User.query.get(adoption.user_id)
    animal = Animals.query.get(adoption.animal_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    if not animal:
        return jsonify({"msg": "Animal no encontrado"}), 404

    # Verificar si ya existe una adopción para este animal
    existing_adoption = Adoption_Users.query.filter_by(animal_id=adoption.animal_id).first()
    if existing_adoption:
        return jsonify({"msg": "Este animal ya tiene registrada una adopción"}), 409

    # Registrar la adopción
    db.session.add(adoption)

    # Actualizar el estado del animal a "adoptado"
    animal.status = StatusEnum.ADOPTED
    db.session.commit()

    return jsonify({"msg": "Adopción registrada exitosamente"}), 201



# ================= Get all adoptions ================== #
@adoptions_bp.route('/', methods=['GET'])
@jwt_required()
def get_adoptions():
    # Obtener parámetros de consulta
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=12, type=int)

    # Construir la consulta base
    adoptions_query = Adoption_Users.query

    # Paginar
    paginated_query = adoptions_query.paginate(page=page, per_page=per_page)

    serialized_adoptions = []
    for adoption in paginated_query:
        # Obtener datos del usuario, del animal y del testimonio
        user = User.query.filter_by(id=adoption.user_id).first()
        animal = Animals.query.filter_by(id=adoption.animal_id).first()
        testimony = Testimony.query.filter_by(adoption_id=adoption.id).first()

        # Serializar la información
        user_info = user.serialize()
        animal_info = animal.serialize()
        images_query = Animals_images.query.filter_by(animal_id=animal_info['id']).all()
        image_urls = [image.image_url for image in images_query]
        if not image_urls:
            image_urls = ["https://res.cloudinary.com/dnwfyqslx/image/upload/v1706630825/default_image_ppkr6u.jpg"]
        animal_info['image_urls'] = image_urls
        adoption_info = adoption.serialize()
        if testimony:
            testimony_info = testimony.serialize()

        # Agregar la info del usuario, del animal y del testimonio al diccionario de la adopción
        adoption_info["user_info"] = user_info
        adoption_info["animal_info"] = animal_info
        if testimony:
            adoption_info["testimony_id"] = testimony_info['id']
            adoption_info["testimony_info"] = testimony_info
        else:
            adoption_info["testimony_id"] = None
            adoption_info["testimony_info"] = None

        serialized_adoptions.append(adoption_info)

    response_body = {
        "msg": "ok",
        "total_adoptions": paginated_query.total,
        "total_pages": paginated_query.pages,
        "current_page": paginated_query.page,
        "result": serialized_adoptions
    }
    
    return jsonify(response_body), 200



# ================= Get adoptions by user ID ================== #
@adoptions_bp.route('/usuario/<int:user_id>', methods=['GET'])
@jwt_required()
def get_adoptions_by_user(user_id):
    """
    Devuelve una lista de adopciones asociadas a un usuario específico.

    Endpoint:
        GET /adopciones/usuario/<int:user_id>

    Parámetros de consulta opcionales:
        - page : Página a devolver (por defecto, 1, es decir, la primera)
        - per_page: Número máximo de registros a devolver (por defecto, 12).
    """

    # Obtener parámetros de consulta
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=12, type=int)

    # Construir la consulta base
    adoptions_query = Adoption_Users.query.filter_by(user_id=user_id)

    # Paginar
    paginated_query = adoptions_query.paginate(page=page, per_page=per_page)

    serialized_adoptions = []
    for adoption in paginated_query:
        # Obtener datos del animal y del testimonio
        animal = Animals.query.filter_by(id=adoption.animal_id).first()
        testimony = Testimony.query.filter_by(adoption_id=adoption.id).first()

        # Serializar la información
        animal_info = animal.serialize()
        images_query = Animals_images.query.filter_by(animal_id=animal_info['id']).all()
        image_urls = [image.image_url for image in images_query]
        if not image_urls:
            image_urls = ["https://res.cloudinary.com/dnwfyqslx/image/upload/v1706630825/default_image_ppkr6u.jpg"]
        animal_info['image_urls'] = image_urls
        adoption_info = adoption.serialize()
        if testimony:
            testimony_info = testimony.serialize()

        # Agregar la info del animal y del testimonio al diccionario de la adopción
        adoption_info["animal_info"] = animal_info
        if testimony:
            adoption_info["testimony_id"] = testimony_info['id']
            adoption_info["testimony_info"] = testimony_info
        else:
            adoption_info["testimony_id"] = None
            adoption_info["testimony_info"] = None

        serialized_adoptions.append(adoption_info)

    response_body = {
        "msg": "ok",
        "total_adoptions": paginated_query.total,
        "total_pages": paginated_query.pages,
        "current_page": paginated_query.page,
        "result": serialized_adoptions
    }

    return jsonify(response_body), 200


  

# ================= Get one adoption by id ================== #
@adoptions_bp.route('/adopcion/<int:adoption_id>', methods=['GET'])
def get_adoption(adoption_id):
    adoption = Adoption_Users.query.get(adoption_id)

    if adoption is None:
        return jsonify({"msg": "Adopción no encontrada"}), 404
    
    # Obtener datos del usuario, del animal y del testimonio
    user = User.query.filter_by(id=adoption.user_id).first()
    animal = Animals.query.filter_by(id=adoption.animal_id).first()
    testimony = Testimony.query.filter_by(adoption_id=adoption.id).first()

    # Serializar la información
    user_info = user.serialize()
    animal_info = animal.serialize()
    adoption_info = adoption.serialize()
    if testimony:
            testimony_info = testimony.serialize()

     # Agregar la info del usuario, animal y testimonio al diccionario de la adopción
    adoption_info["user_info"] = user_info
    adoption_info["animal_info"] = animal_info
    if testimony:
        adoption_info["testimony_id"] = testimony_info['id']
        adoption_info["testimony_info"] = testimony_info
    else:
        adoption_info["testimony_id"] = None
        adoption_info["testimony_info"] = None
        
    
    return jsonify(adoption_info), 200