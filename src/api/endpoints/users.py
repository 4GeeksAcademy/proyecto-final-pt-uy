from flask import Flask, request, jsonify, Blueprint
from api.models import RoleEnum, UserStatusEnum, db, User, Adoption_Users
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from ..routes import handle_email_change_confirmation
from dotenv import load_dotenv
import os

users_bp = Blueprint('usuarios', __name__)

bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(users_bp)

# Cargar variables de entorno desde el archivo .env
load_dotenv()



#################### USERS ROUTES ###################
# ================== Get all users ================ #
@users_bp.route('/', methods=['GET'])
@jwt_required()
def get_users():
     # Obtener parámetros de consulta
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=12, type=int)

    # Construir la consulta base
    users_query = User.query

    # Paginar
    paginated_query = users_query.paginate(page=page, per_page=per_page)

    serialized_users = []
    for user in paginated_query:
        # Obtener la lista de animales adoptados por el usuario
        adopted_animals = Adoption_Users.query.filter_by(user_id=user.id).all()

        # Serializar la información del usuario y la lista de animales adoptados
        user_info = user.serialize()
        adopted_animals_info = [adoption.serialize() for adoption in adopted_animals]

        # Agregar la lista de animales adoptados al diccionario del usuario
        user_info["adopted_animals"] = adopted_animals_info

        serialized_users.append(user_info)

    # Construir la respuesta
    response_body = {
        "msg": "ok",
        "total_users": paginated_query.total,
        "total_pages": paginated_query.pages,
        "current_page": paginated_query.page,
        "result": serialized_users
    }

    return jsonify(response_body), 200



# ================= Get one user by id ================= #
@users_bp.route('/usuario/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    # Obtener la lista de animales adoptados por el usuario
    adopted_animals = Adoption_Users.query.filter_by(user_id=user_id).all()

    # Serializar la información del usuario y la lista de animales adoptados
    user_info = user.serialize()
    adopted_animals_info = [adoption.serialize() for adoption in adopted_animals]

    # Agregar la lista de animales adoptados al diccionario del usuario
    user_info["adopted_animals"] = adopted_animals_info

    return jsonify(user_info), 200



# ================= Modify one user by id ================= #
@users_bp.route('/usuario/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json()

    # Campos obligatorios
    if 'name' in data:
        user.name = data['name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'user_name' in data:
        user.user_name = data['user_name']
    if 'email' in data:
        old_email = user.email

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
    if 'status' in data:
        user.status = data['status']

    db.session.commit()
    
    if 'email' in data and data['email'] != old_email:
        handle_email_change_confirmation(user.email, user.name)

    return jsonify({"msg": "User updated successfully"}), 200



# ================== Cambiar Contraseña (Usuario Logeado) ================== #
@users_bp.route('/usuario/cambiar-contrasenia', methods=['POST'])
@jwt_required()
def change_password():
    # Obtener la identidad del usuario desde el token JWT
    current_user_id = get_jwt_identity()

    # Obtener el usuario actual
    current_user = User.query.get(current_user_id)

    # Verificar que el usuario exista
    if not current_user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Obtener las contraseñas proporcionadas en la solicitud
    body = request.get_json(silent=True)
    old_password = body['old_password']
    new_password = body['new_password']

    # Verificar que se proporcionen las contraseñas
    if not old_password or not new_password:
        return jsonify({"msg": "Se requieren tanto la antigua como la nueva contraseña"}), 400

    # Verificar que la old_password coincida con la contraseña actual del usuario
    if not bcrypt.check_password_hash(current_user.password, old_password):
        return jsonify({"msg": "La antigua contraseña no es válida"}), 401

    # Hash de la nueva contraseña antes de almacenarla
    hashed_new_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    # Actualizar la contraseña del usuario con la new_password
    current_user.password = hashed_new_password

    # Guardar los cambios en la base de datos
    db.session.commit()

    return jsonify({"msg": "Contraseña cambiada exitosamente"}), 200





# ================== Banear o Desbanear Usuario ================== #
@users_bp.route('/usuario/ban-unban/<int:user_id>', methods=['PATCH'])
@jwt_required()
def ban_unban_user(user_id):
    current_user = User.query.get(get_jwt_identity())

    # Verificar que el usuario logeado tenga rol "admin"
    if current_user.role != RoleEnum.ADMIN:
        return jsonify({"msg": "Acceso denegado. Se requiere rol de administrador"}), 403

    user_to_ban_unban = User.query.get(user_id)

    if not user_to_ban_unban:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Cambiar el estado del usuario (banear/desbanear)
    if user_to_ban_unban.status == UserStatusEnum.ACTIVE:
        user_to_ban_unban.status = UserStatusEnum.BANNED
    else:
        user_to_ban_unban.status = UserStatusEnum.ACTIVE

    db.session.commit()

    return jsonify({"msg": "Estado de usuario cambiado exitosamente"}), 200



# ================== Eliminar Usuario ================== #
@users_bp.route('/usuario/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user = User.query.get(get_jwt_identity())

    # Verificar que el usuario logeado sea el propio usuario o tenga rol "admin"
    if current_user.id != user_id and current_user.role != RoleEnum.ADMIN:
        return jsonify({"msg": "Acceso denegado. No tienes permisos para eliminar este usuario"}), 403

    user_to_delete = User.query.get(user_id)

    if not user_to_delete:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Cambiar el estado del usuario a "deleted"
    user_to_delete.status = UserStatusEnum.DELETED

    db.session.commit()

    return jsonify({"msg": "Usuario eliminado exitosamente"}), 200



# ================= Modify user role ================== #
@users_bp.route('/modificar-rol/<int:user_id>', methods=['PUT'])
@jwt_required()
def modify_user_role(user_id):
    """
    Modifica el rol de un usuario

    Endpoint:
        PUT /usuarios/modificar-rol/<int:user_id>

    Parámetro de consulta obligatorio:
        - new_role : Nuevo rol del usuario ("user" o "admin").

    Header:
        - Authorization: Token JWT del usuario logeado con rol "admin".

    Retorna:
        - Mensaje de éxito o error.
    """

    # Obtener el usuario actual
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Verificar que el usuario actual sea un administrador
    if current_user.role != RoleEnum.ADMIN:
        return jsonify({"msg": "Acceso denegado. Se requiere rol de administrador"}), 403

    # Obtener el nuevo rol del usuario del body de la solicitud
    body = request.get_json(silent=True)

    if body is None:
        return jsonify({"msg": "Debes enviar los datos en el body"}), 400
    if 'new_role' not in body:
        return jsonify({"msg": "El campo new_role es obligatorio"}), 400
   
    new_role = request.json.get('new_role')

    # Validar que el nuevo rol sea válido
    if new_role not in ["user", "admin"]:
        return jsonify({"msg": "El rol proporcionado no es válido"}), 400

    # Buscar el usuario en la base de datos
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Actualizar el estado del testimonio
    if new_role == 'user':
        user.role = RoleEnum.USER
    if new_role == 'admin':
        user.role = RoleEnum.ADMIN

    # Guardar los cambios en la base de datos
    db.session.commit()

    return jsonify({"msg": f"El rol del usuario {user_id} ha sido actualizado a {new_role}"}), 200