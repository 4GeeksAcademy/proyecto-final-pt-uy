from operator import or_
from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS
from cloudinary import config as cloudinary_config
from cloudinary.uploader import upload
from dotenv import load_dotenv
import os

from api.models import RoleEnum, StatusEnum, db, User,Testimony, Animals, Animals_images, Adoption_Users

animals_bp = Blueprint('animales', __name__)

# Allow CORS requests to this API
CORS(animals_bp)

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Configurar Cloudinary
cloudinary_config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)



##################### ANIMALS ROUTES #####################
# =============== Register an Animal =================== #
@animals_bp.route('/animal', methods=['POST'])
@jwt_required()
def register_animal():
    """
    /animales/animal

    Registra un animal.   
    """

    # Obtener datos del formulario
    animal_data = request.form
    print(request.form)

    # Obtener imágenes del formulario
    images = request.files.getlist('images')

    if not animal_data:
        return jsonify({"msg": "Error: la petición no contiene la información requerida"}), 400

    required_fields = ['name', 'type', 'birth_date']

    for field in required_fields:
        if field not in animal_data:
            return jsonify({'msg': f'El campo {field} es requerido'}), 400

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
    else:
        animal.status = StatusEnum.NOT_ADOPTED

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



# # =============== Get All Animals ================== #
@animals_bp.route('/', methods=['GET'])
def get_animals():
    """
    /animales

    Devuelve todos los registros de la tabla Animales con opciones de filtrado, ordenamiento y paginado.
    """

    # Obtener parámetros de consulta
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=12, type=int)
    sort_by = request.args.get('sort_by', default='id', type=str)
    sort_order = request.args.get('sort_order', default='asc', type=str)

    # Filtrado por tipo, género y tamaño
    types = request.args.get('types')
    genders = request.args.get('genders')
    sizes = request.args.get('sizes')

    # Convertir cadenas separadas por comas en listas
    types = types.split(',') if types else []
    genders = genders.split(',') if genders else []
    sizes = sizes.split(',') if sizes else []

    # Considerar "undefined" como None
    genders = [None if gender == 'undefined' else gender for gender in genders]
    sizes = [None if size == 'undefined' else size for size in sizes]

    # Construir la consulta base
    query = Animals.query

    # Filtrar por tipo
    if types:
        query = query.filter(Animals.type.in_(types))

    # Filtrar por género
    if genders:
        if None in genders:
            query = query.filter(or_(Animals.gender.in_(genders), Animals.gender.is_(None)))
        else:
            query = query.filter(Animals.gender.in_(genders))

    # Filtrar por tamaño
    if sizes: 
        if None in sizes:
            query = query.filter(or_(Animals.size.in_(sizes), Animals.size.is_(None)))
        else:
            query = query.filter(Animals.size.in_(sizes))

    # Ordenar
    if sort_by and sort_order:
        if sort_order.lower() == 'asc':
            query = query.order_by(getattr(Animals, sort_by).asc())
        elif sort_order.lower() == 'desc':
            query = query.order_by(getattr(Animals, sort_by).desc())

    # Paginar
    paginated_query = query.paginate(page=page, per_page=per_page)

    # Serializar los resultados
    serialized_animals = []
    for animal in paginated_query.items:
        serialized_animal = animal.serialize()
        images_query = Animals_images.query.filter_by(animal_id=animal.id).all()
        image_urls = [image.image_url for image in images_query]
        if not image_urls:
            image_urls = ["https://res.cloudinary.com/dnwfyqslx/image/upload/v1706630825/default_image_ppkr6u.jpg"]
        serialized_animal['image_urls'] = image_urls
        serialized_animals.append(serialized_animal)

    # Construir la respuesta
    response_body = {
        "msg": "ok",
        "total_animals": paginated_query.total,
        "total_pages": paginated_query.pages,
        "current_page": paginated_query.page,
        "result": serialized_animals
    }

    return jsonify(response_body), 200



# =============== Get One Animal by Id ================== #
@animals_bp.route('/animal/<int:animal_id>', methods=['GET'])
def get_animal(animal_id):
    """
    /animales/animal/22 (por ejemplo)

    Devuelve un animal según el id especificado.   
    """

    animal = Animals.query.get(animal_id)

    if not animal:
        return jsonify({"msg": "Peludito no encontrado"}), 404
    
    # Serializar el animal
    serialized_animal = animal.serialize()

    # Obtener las imágenes asociadas al animal
    images_query = Animals_images.query.filter_by(animal_id=animal.id).all()

    # Obtener solo las URL de las imágenes
    image_urls = [image.image_url for image in images_query]
    # Si el animal no tiene al menos una imagen, se envía una imagen con el logo
    if len(image_urls) < 1:
        image_urls = ["https://res.cloudinary.com/dnwfyqslx/image/upload/v1706630825/default_image_ppkr6u.jpg"]

    # Agregar las URLs al objeto del animal
    serialized_animal['image_urls'] = image_urls

    return jsonify(serialized_animal), 200



# ================== Eliminar Animal (Solo para Administradores) ================== #
@animals_bp.route('/animal/<int:animal_id>', methods=['DELETE'])
@jwt_required()
def delete_animal(animal_id):
    """
    /animales/animal/22 (por ejemplo)

    Elimina un registro de la tabla Animales según el id especificado.   
    """

    current_user = User.query.get(get_jwt_identity())

    # Verificar que el usuario logeado tenga rol "admin"
    if current_user.role != RoleEnum.ADMIN:
        return jsonify({"msg": "Acceso denegado. Se requiere rol de administrador"}), 403

    animal_to_delete = Animals.query.get(animal_id)

    if not animal_to_delete:
        return jsonify({"msg": "Peludito no encontrado"}), 404

    # Verificar si hay registros relacionados
    has_images = db.session.query(Animals_images).filter_by(animal_id=animal_id).count() > 0
    has_testimonies = db.session.query(Testimony).filter_by(animal_id=animal_id).count() > 0
    has_adoptions = db.session.query(Adoption_Users).filter_by(animal_id=animal_id).count() > 0

    if has_images or has_testimonies or has_adoptions:
        return jsonify({"msg": "No se puede eliminar este peludito debido a registros relacionados"}), 400

    # Eliminar el animal de la base de datos
    db.session.delete(animal_to_delete)
    db.session.commit()

    return jsonify({"msg": "Peludito eliminado exitosamente"}), 200



# ================== Actualizar Animal (Solo para Administradores) ================== #
@animals_bp.route('/animal/<int:animal_id>', methods=['PUT'])
@jwt_required()
def update_animal(animal_id):
    """
    /animales/animal/22 (por ejemplo)

    Actualiza los datos de un registro de la tabla Animales según el id especificado.   
    """

    current_user = User.query.get(get_jwt_identity())

    # Verificar que el usuario logeado tenga rol "admin"
    if current_user.role != RoleEnum.ADMIN:
        return jsonify({"msg": "Acceso denegado. Se requiere rol de administrador"}), 403

    animal_to_update = Animals.query.get(animal_id)

    if not animal_to_update:
        return jsonify({"msg": "Peludito no encontrado"}), 404

    # Obtener nuevos datos del formulario (pueden ser parciales)
    new_animal_data = request.form

    # Actualizar los campos del animal con los nuevos datos
    for field, value in new_animal_data.items():
        setattr(animal_to_update, field, value)

    # Gestionar las imágenes y actualizarlas en Cloudinary (por ahora sustituye las anteriores por las nuevas)
    new_images = request.files.getlist('images')

    # Eliminar todas las imágenes existentes del animal
    Animals_images.query.filter_by(animal_id=animal_id).delete()

    # Subir y almacenar las nuevas imágenes en Cloudinary
    image_urls = []  # Lista para almacenar las URLs de las imágenes

    for image in new_images:
        upload_response = upload(image)  # Subir la imagen a Cloudinary
        image_urls.append(upload_response['secure_url'])  # Obtener la URL y agregarla a la lista

        # Almacenar la información de la imagen en la base de datos
        animal_image = Animals_images(image_url=upload_response['secure_url'], public_id=upload_response['public_id'], animal_id=animal_id)
        db.session.add(animal_image)

    db.session.commit()

    serialized_animal = animal_to_update.serialize()

    # Agregar las nuevas URLs de las imágenes a la respuesta
    serialized_animal['image_urls'] = image_urls

    response_body = {
        "msg": "ok",
        "result": serialized_animal
    }

    return jsonify(response_body), 200




# # =============== Get All Animals ================== #
# (versión sin parámetros de filtrado, paginado u ordenamiento)

# @animals_bp.route('/', methods=['GET'])
# def get_animals():
#     """
#     /animales

#     Devuelve todos los registros de la tabla Animales.   
#     """

#     animals_query = Animals.query.all()
#     serialized_animals = []

#     for animal in animals_query:
#         # Serializar el animal
#         serialized_animal = animal.serialize()

#         # Obtener las imágenes asociadas al animal
#         images_query = Animals_images.query.filter_by(animal_id=animal.id).all()

#         # Obtener solo las URL de las imágenes
#         image_urls = [image.image_url for image in images_query]
#         # Si el animal no tiene al menos una imagen, se envía una imagen con el logo
#         if len(image_urls) < 1:
#             image_urls = ["https://res.cloudinary.com/dnwfyqslx/image/upload/v1706630825/default_image_ppkr6u.jpg"]

#         # Agregar las URLs al objeto del animal
#         serialized_animal['image_urls'] = image_urls

#         # Agregar el animal serializado a la lista resultante
#         serialized_animals.append(serialized_animal)

#     response_body = {
#          "msg": "ok",
#          "total_animals": len(serialized_animals),
#          "result": serialized_animals
#      }
    
#     return jsonify(response_body), 200