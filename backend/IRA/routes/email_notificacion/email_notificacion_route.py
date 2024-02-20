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

        # Detalles del mensaje
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
        'mensaje': 'No se realizó ninguna acción'
    }


# @email_blueprint.route('/cambiar_estado_resultado/<int:resultado_id>', methods=['PUT'])
# def cambiar_estado_resultado(resultado_id):
#     return cambiar_estado_resultado_db(resultado_id)


# def cambiar_estado_resultado_db(resultado_id):
#     try:
#         resultado = Examen.query.get(resultado_id)

#         if resultado is None:
#             return jsonify({'mensaje': 'Resultado de aprendizaje no encontrado', 'status': 404}), 404

#         resultado.estado = not resultado.estado

#         db.session.commit()

#         mensaje_estado = 'desactivado' if not resultado.estado else 'activado'
#         return jsonify({'mensaje': f'Estado del resultado de aprendizaje {mensaje_estado} exitosamente', 'status': 200}), 200

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'mensaje': 'Fallo al cambiar el estado del resultado de aprendizaje', 'error': str(e), 'status': 500}), 500
