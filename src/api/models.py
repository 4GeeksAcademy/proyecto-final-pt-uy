from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import reconstructor
import enum

db = SQLAlchemy()

class YesNoEnum(str, enum.Enum):
    YES = "yes"
    NO = "no"

class RoleEnum(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"

class TypeEnum(str, enum.Enum):
    CAT = "cat"
    DOG = "dog"

class SizeEnum(str, enum.Enum):
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"
    EXTRA_LARGE = "extra_large" 

class GenderEnum(str, enum.Enum):
    MALE = "male"
    FEMALE = "female"

class StatusEnum(str, enum.Enum):
    ADOPTED = "adopted"
    NOT_ADOPTED = "not_adopted"
    PASSED_AWAY = "passed_away"

class UserStatusEnum(str, enum.Enum):
    ACTIVE = "active"
    DELETED = "deleted"
    BANNED = "banned"

class TestimonyStatusEnum(str, enum.Enum):
    APPROVED =  "approved"
    PENDING = "pending"
    REJECTED = "rejected"

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    address = db.Column(db.String(50), nullable=True)
    phone_number = db.Column(db.Integer, nullable=True)
    backyard = db.Column(db.Enum(YesNoEnum, name="yes_no_enum_backyard"), nullable=True)
    other_pets = db.Column(db.String(30))
    role = db.Column(db.Enum(RoleEnum, name="role_enum"), default=RoleEnum.USER)
    status = db.Column(db.Enum(UserStatusEnum, name="user_status_enum"), default=UserStatusEnum.ACTIVE)

    def __repr__(self):
        return 'User with id {} and userName {}'.format(self.id, self.user_name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name, 
            "last_name": self.last_name,
            "user_name": self.user_name,
            "email": self.email,
            "address": self.address,
            "phone_number": self.phone_number,
            "backyard": self.backyard,
            "other_pets": self.other_pets,
            "role": self.role,
            "status": self.status,
        }

class Animals(db.Model):
    __tablename__ = "animals"
    id = db.Column(db.Integer, primary_key=True)
    identification_code = db.Column(db.String(10), unique=True)
    type = db.Column(db.Enum(TypeEnum, name="type_enum"), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    size = db.Column(db.Enum(SizeEnum, name="size_enum"))
    gender = db.Column(db.Enum(GenderEnum, name="gender_enum"))
    birth_date = db.Column(db.Date, nullable=False)
    vaccinated = db.Column(db.Enum(YesNoEnum, name="yes_no_enum_vaccinated"))
    castrated = db.Column(db.Enum(YesNoEnum, name="yes_no_enum_castrated"))
    dewormed = db.Column(db.Enum(YesNoEnum, name="yes_no_enum_dewormed"))
    microchip = db.Column(db.Enum(YesNoEnum, name="yes_no_enum_microchip"))
    publication_date = db.Column(db.Date)
    additional_information = db.Column(db.String(400))
    status = db.Column(db.Enum(StatusEnum, name="status_enum"))

    def __repr__(self):
        return '{} with identification code {} and name {}'.format(self.type, self.identification_code, self.name)

    def serialize(self):
        return {
            "id": self.id,
            "identification_code": self.identification_code,
            "type": self.type,
            "name": self.name, 
            "size": self.size,
            "gender": self.gender,
            "birth_date": self.birth_date,
            "vaccinated": self.vaccinated,
            "castrated": self.castrated,
            "dewormed": self.dewormed,
            "microchip": self.microchip,
            "publication_date": self.publication_date,
            "additional_information": self.additional_information,
            "status": self.status
        }


class Animals_images(db.Model):
    __tablename__ = "animals_images"
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey("animals.id"))
    animal_relationship = db.relationship(Animals)

    def __repr__(self):
        return 'Image with id {} corresponds to animal with id {}'.format(self.id, self.animal_id)

    def serialize(self):
        return {
            "id": self.id,
            "public_id": self.public_id,
            "image_url": self.image_url,
            "animal_id": self.animal_id
        }

class Testimony(db.Model):
    __tablename__ = "testimony"
    id = db.Column(db.Integer, primary_key=True)
    testimony_text = db.Column(db.String(400), nullable=False)
    image_url = db.Column(db.String, unique=True)
    status = db.Column(db.Enum(TestimonyStatusEnum, name="testimony_status_enum"), nullable=False, default=TestimonyStatusEnum.PENDING)

    def __repr__(self):
        return 'Testimony with id {} and status {}'.format(self.id, self.status)

    def serialize(self):
        return {
            "id": self.id,
            "testimony_text": self.testimony_text,
            "image_url": self.image_url,
            "status": self.status
        }

class Adoption_Users(db.Model):
    __tablename__ = "adoption_users"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user_relationship = db.relationship(User)
    animal_id = db.Column(db.Integer, db.ForeignKey("animals.id"), unique=True, nullable=False)
    animal_relationship = db.relationship(Animals)
    testimony_id = db.Column(db.Integer, db.ForeignKey("testimony.id"), unique=True)
    testimony_relationship = db.relationship(Testimony)

    def __repr__(self):
        return 'User with id {} has adopted an animal with id {} and wrote a testiomny with id {}'.format(self.user_id, self.animal_id, self.testimony_id)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "animal_id": self.animal_id,
            "testimony_id": self.testimony_id
        }