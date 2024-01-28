from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS

from api.models import RoleEnum, StatusEnum, db, User, Animals, Adoption_Users

adoptions_bp = Blueprint('adoptions', __name__)

# Allow CORS requests to this API
CORS(adoptions_bp)


############################## ADOPTIONS ROUTES ##############################
# ============= Registrar Adopción (Solo para Administradores) ============= #
@adoptions_bp.route('/adoption', methods=['POST'])
@jwt_required()
def register_adoption():
    """
    /adoptions/adoption

    Registra una adopción.

    Requiere un token JWT de administrador para acceder.

    Parámetros de la solicitud (JSON):
    - user_id: ID del usuario adoptante.
    - animal_id: ID del animal adoptado.

    Ejemplo de solicitud JSON:
    {
        "user_id": 123,
        "animal_id": 456
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
    data = request.json

    # Validar que los campos requeridos estén presentes en la solicitud
    required_fields = ['user_id', 'animal_id']
    for field in required_fields:
        if field not in data:
            return jsonify({"msg": f"El campo {field} es requerido"}), 400

    user_id = data['user_id']
    animal_id = data['animal_id']

    # Verificar si el usuario y el animal existen en la base de datos
    user = User.query.get(user_id)
    animal = Animals.query.get(animal_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    if not animal:
        return jsonify({"msg": "Animal no encontrado"}), 404

    # Verificar si ya existe una adopción para este animal
    existing_adoption = Adoption_Users.query.filter_by(animal_id=animal_id).first()
    if existing_adoption:
        return jsonify({"msg": "Este animal ya tiene registrada una adopción"}), 409

    # Registrar la adopción
    new_adoption = Adoption_Users(user_id=user_id, animal_id=animal_id)
    db.session.add(new_adoption)

    # Actualizar el estado del animal a "adoptado"
    animal.status = StatusEnum.ADOPTED
    db.session.commit()

    return jsonify({"msg": "Adopción registrada exitosamente"}), 201
