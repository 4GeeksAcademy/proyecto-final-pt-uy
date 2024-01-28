from flask import Flask, request, jsonify, Blueprint
from api.models import RoleEnum, UserStatusEnum, db, User, Adoption_Users
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

auth_bp = Blueprint('auth', __name__)

bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(auth_bp)

# Cargar variables de entorno desde el archivo .env
load_dotenv()



###################### AUTH ROUTES #####################
# ================== Register an User ================ #
@auth_bp.route('/register', methods=['POST'])
def register():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar informacion en el body'}), 400

    required_fields = ['name', 'last_name', 'username', 'password', 'email']

    for field in required_fields:
        if field not in body or body[field] is None:
            return jsonify({'msg': f'El campo {field} es obligatorio'}), 400

    user = User()
    user.name = body['name']
    user.last_name = body['last_name']
    user.user_name = body['username']
    user.email = body['email']
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    user.password = pw_hash
    user.is_active = True

    #valores opcionales (pueden ser None)
    user.address = body.get('address')
    user.phone_number = body.get('phone_number')
    user.backyard = body.get('backyard')
    user.other_pets = body.get('other_pets')
    user.role = body.get('role', RoleEnum.USER)  #Valor predeterminado si no se proporciona
    user.status = body.get('status', UserStatusEnum.ACTIVE)

    db.session.add(user)
    db.session.commit()
    return jsonify({'msg': 'Usuario registrado'}), 200



# ===================== User Login ==================== #
@auth_bp.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)

    if body is None:
        return jsonify({"msg": "Debes enviar las credenciales en el body"}), 400
    if 'email' not in body:
        return jsonify({"msg": "El campo email es obligatorio"}), 400
    if 'password' not in body:
        return jsonify({"msg": "El campo password es obligatorio"}), 400
    
    user = User.query.filter_by(email = body['email']).first()
    if user is None or not bcrypt.check_password_hash(user.password, body['password']):
        return jsonify({'msg': 'Usuario o contraseña incorrectos'}), 400
    
    if user.status == "banned":
        return jsonify({'msg': 'Acceso denegado. Tu cuenta ha sido suspendida. Si crees que esto es un error, por favor contacta al soporte.'}), 403
    
    if user.status == "deleted":
        return jsonify({'msg': 'Tu cuenta ha sido eliminada. Si crees que esto es un error, por favor contacta al soporte.'}), 403
    
    access_token = create_access_token(identity = user.id)

    response_body = {
         "msg": "ok",
         "token": access_token,
         "user": {
             "id": user.id,
             "name": user.name,
             "role": user.role
         }
    }

    return jsonify(response_body), 200

