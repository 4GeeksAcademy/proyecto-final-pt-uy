"""
Este módulo se encarga de iniciar el servidor API, cargar la base de datos y agregar los puntos finales.
"""
from flask import Flask, request, jsonify, url_for, Blueprint, render_template
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from dotenv import load_dotenv
import os
from api.models import RoleEnum, StatusEnum, db, User, Animals, Adoption_Users

import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from smtplib import SMTPException


def generate_token_password(email):
    expire = datetime.timedelta(hours=1)
    token = create_access_token(identity=email, expires_delta=expire)
    return token 


def handle_email_send(recipient, name):
    try:
        smtp_server = os.getenv('SMTP_SERVER')
        smtp_port = os.getenv('SMTP_PORT')
        smtp_username = os.getenv('SMTP_USERNAME')
        smtp_password = os.getenv('SMTP_PASSWORD')
          
        # configuración del servidor SMTP
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        print(recipient)
        # crear mensaje
        message = MIMEMultipart('alternative')
        message["Subject"] = "Correo Electronico desde ElRefugio"
        message["From"] = smtp_username
        message["To"] = recipient

        # creación del token de enlace de restablecimiento de contraseña
        generated_token = generate_token_password(recipient)
        frontend_url = os.getenv('FRONTEND_URL')
        password_reset_url = f"{frontend_url}/new-password?token={generated_token}"

        # renderizar plantilla HTML
        html = render_template("email_template2.html", name=name, password_reset_url=password_reset_url)
        html_part = MIMEText(html, 'html')

        # adjuntar el contenido HTML
        message.attach(html_part)

        # enviar el correo electrónico
        server.sendmail(smtp_username, recipient, message.as_string())
        return "Correo electrónico enviado exitosamente."
    except SMTPException as e:
        return f"Error al enviar el correo electrónico: {e}"
    except Exception as e:
        return f"Ocurrió un error: {e}"
    finally:
        server.quit()    

def handle_registration_confirmation(recipient, name):
    try:
        smtp_server = os.getenv('SMTP_SERVER')
        smtp_port = os.getenv('SMTP_PORT')
        smtp_username = os.getenv('SMTP_USERNAME')
        smtp_password = os.getenv('SMTP_PASSWORD')
          
          
        # Configuración del servidor SMTP
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        
        # Crear mensaje
        message = MIMEMultipart('alternative')
        message["Subject"] = "Confirmación de registro en El Refugio"
        message["From"] = smtp_username
        message["To"] = recipient

        # Renderizar plantilla HTML para el correo de confirmación
        html = render_template("registration_confirmation_template.html", name=name)
        html_part = MIMEText(html, 'html')

        # Adjuntar el contenido HTML al mensaje
        message.attach(html_part)

        # Enviar el correo electrónico
        server.sendmail(smtp_username, recipient, message.as_string())
        
        return "Correo electrónico de confirmación enviado exitosamente."
    except SMTPException as e:
        return f"Error al enviar el correo electrónico: {e}"
    except Exception as e:
        return f"Ocurrió un error: {e}"
    finally:
        server.quit()


def handle_email_change_confirmation(recipient, name):
    try:
        smtp_server = os.getenv('SMTP_SERVER')
        smtp_port = os.getenv('SMTP_PORT')
        smtp_username = os.getenv('SMTP_USERNAME')
        smtp_password = os.getenv('SMTP_PASSWORD')
          
          
        # Configuración del servidor SMTP
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        
        # Crear mensaje
        message = MIMEMultipart('alternative')
        message["Subject"] = "Confirmación de cambio de correo en su cuenta El Refugio"
        message["From"] = smtp_username
        message["To"] = recipient

        # Renderizar plantilla HTML para el correo de confirmación
        html = render_template("change_email_template.html", name=name)
        html_part = MIMEText(html, 'html')

        # Adjuntar el contenido HTML al mensaje
        message.attach(html_part)

        # Enviar el correo electrónico
        server.sendmail(smtp_username, recipient, message.as_string())
        
        return "Correo electrónico de cambio enviado exitosamente."
    except SMTPException as e:
        return f"Error al enviar el correo electrónico: {e}"
    except Exception as e:
        return f"Ocurrió un error: {e}"
    finally:
        server.quit()

api = Blueprint('api', __name__)

# Permitir solicitudes CORS a esta API
CORS(api)

# Cargar variables de entorno desde el archivo .env
load_dotenv()

@api.route('/password-reset-request', methods=['POST'])
def password_reset_request():
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"error": "no se proporcionaron datos JSON en la solicitud"}), 400

    if "email" not in data:
        return jsonify({"message": "faltan campos obligatorios"}), 400

    # verificar si el correo electrónico existe
    existing_user = User.query.filter_by(email = data['email']).first()
    
    if existing_user:
        handle_email_send(existing_user.email, existing_user.name)
        return jsonify({"message": "Solicitud recibida. Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña."}), 200
    else :
        return jsonify({"message": "Solicitud recibida. Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña."}), 200
    

@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():
    response_body = {
        "message": "¡Hola! Soy un mensaje que proviene del backend. Verifica la pestaña de red en el inspector de Google y verás la solicitud GET"
    }

    return jsonify(response_body), 200
