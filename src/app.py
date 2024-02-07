import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import UserStatusEnum, db, User, RoleEnum
from api.routes import api
from api.endpoints.adoptions import adoptions_bp
from api.endpoints.animals import animals_bp
from api.endpoints.testimonials import testimonials_bp
from api.endpoints.users import users_bp
from api.endpoints.auth import auth_bp
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Crear la aplicación Flask
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configuración de la aplicación Flask
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

# Configuración de JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

jwt = JWTManager(app)

bcrypt = Bcrypt(app)
CORS(app)
# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API
app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(adoptions_bp, url_prefix='/adopciones')
app.register_blueprint(animals_bp, url_prefix='/animales')
app.register_blueprint(testimonials_bp, url_prefix='/testimonios')
app.register_blueprint(users_bp, url_prefix='/usuarios')
app.register_blueprint(auth_bp, url_prefix='/auth')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code



# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response



@app.route('/password-update', methods=['POST'])
@jwt_required()
def password_update():
    try:
        data = request.get_json(silent=True)

        if data is None:
            return jsonify({"error":"No JSON data provided in the request"}), 400

        if "password" not in data:
            return jsonify({"message": "Required fields are missing."}), 400
        
        new_password = data["password"]
        current_user = get_jwt_identity()

        user = User.query.filter_by(email=current_user).first()



        if not user:
            return jsonify({"message":"user not found"})
        
        user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        db.session.commit()
        return jsonify({"message": "password update succesfully"}), 200
   
    except Exception as e:
       print(f"Error: {e}")
       db.session.rollback()
    return jsonify({"message": "error updating password"}), 500

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
