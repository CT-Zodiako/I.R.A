from ...db import db
from flask import Blueprint, request, jsonify
from ...models.examen.examen_model import Examen
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



@email_blueprint.route('/cambiar_estado_resultado/<int:resultado_id>', methods=['PUT'])

def cambiar_estado_resultado(resultado_id):
    return cambiar_estado_resultado_db(resultado_id)




def cambiar_estado_resultado_db(resultado_id):
    try:
        resultado = Examen.query.get(resultado_id)

        if resultado is None:
            return jsonify({'mensaje': 'Resultado de aprendizaje no encontrado', 'status': 404}), 404

        resultado.estado = not resultado.estado

        db.session.commit()

        mensaje_estado = 'desactivado' if not resultado.estado else 'activado'
        return jsonify({'mensaje': f'Estado del resultado de aprendizaje {mensaje_estado} exitosamente', 'status': 200}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'mensaje': 'Fallo al cambiar el estado del resultado de aprendizaje', 'error': str(e), 'status': 500}), 500