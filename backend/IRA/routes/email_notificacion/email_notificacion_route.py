from flask import Blueprint, request, jsonify
from ...controller.email_notificaciones.email_notificacion_controller import enviar_correo, obtener_destinatarios_por_examen


email_blueprint = Blueprint('email', __name__)


@email_blueprint.route('/enviar_correo', methods=['POST'])
def enviar_correo_route():
    if request.method == 'POST':
        # Obtener la lista de destinatarios desde la base de datos o alguna fuente
        # Asume que el ID del examen está en el cuerpo de la solicitud
        examen_id = request.json.get('examen_id')
        destinatarios = obtener_destinatarios_por_examen(examen_id)

        if destinatarios is None:
            return {
                'status': 404,
                'mensaje': 'No existes un examen con ese ID',
            }

        asunto = "Tienes exámenes por calificar"
        cuerpo = "Estimado evaluador, tienes exámenes pendientes por calificar. Por favor, revisa tu cuenta para más detalles."

        # Enviar correos a cada destinatario
        for destinatario in destinatarios:
            enviar_correo(destinatario, asunto, cuerpo)

        return {
            'status': 200,
            'mensaje': 'Correos enviados correctamente'
        }

    return {
        'status': 400,
        'mensaje': 'Falló al enviar correos, revise los datos enviados'
    }
