from ...db import db
from flask import Blueprint, request, jsonify
import smtplib
from email.mime.text import MIMEText

email_blueprint = Blueprint('email', __name__)

def enviar_correo(destinatario, asunto, cuerpo):
    # Configurar el servidor SMTP
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()

    # Iniciar sesión
    server.login("tryhardskill98@gmail.com", "ybpy hspa fzje jdzh")

    # Crear el mensaje
    msg = MIMEText(cuerpo)
    msg['Subject'] = asunto
    msg['From'] = "tryhardskill98@gmail.com"
    msg['To'] = destinatario

    # Enviar el correo
    server.sendmail("tryhardskill98@gmail.com", destinatario, msg.as_string())

    # Cerrar la conexión
    server.quit()

# Cambié el nombre de la función para evitar conflictos
@email_blueprint.route('/enviar_correo', methods=['POST'])
def enviar_correo_route():
    if request.method == 'POST':
        # Lista de destinatarios (puedes obtener esto de tu base de datos u otra fuente)
        destinatarios = ["zodiakoop@gmail.com"]

        # Detalles del mensaje
        asunto = "Tienes exámenes por calificar"
        cuerpo = "Estimado evaluador, tienes exámenes pendientes por calificar. Por favor, revisa tu cuenta para más detalles."

        # Enviar correos a cada destinatario
        for destinatario in destinatarios:
            enviar_correo(destinatario, asunto, cuerpo)

        return 'Correos enviados correctamente'

    return 'No se realizó ninguna acción'
