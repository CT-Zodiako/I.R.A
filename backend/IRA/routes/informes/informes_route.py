from flask import Blueprint, request, jsonify
from ...controller.informes.informes_controller import traer_calificaciones_db
from ...models.calificacion.calificacion_model import CalificacionExamen
from ...models.calificacion.schema import CalificacionExamenSchema


informes_blueprint = Blueprint('informes', __name__)

@informes_blueprint.route('/traer_calificaciones', methods=['GET'])
def traer_calificaciones():
    return traer_calificaciones_db()

@informes_blueprint.route('/calificacion_by_id_examen/<int:examen_id>', methods=['GET'])
def obtener_calificaciones_por_examen(examen_id):
    # Realiza una consulta para obtener las calificaciones relacionadas con el examen_id
    calificaciones_examenes = CalificacionExamen.query.filter_by(examen_id=examen_id).all()

    # Utiliza el esquema CalificacionExamenSchema para serializar los objetos CalificacionExamen
    calificaciones_schema = CalificacionExamenSchema(many=True)
    calificaciones_serializables = calificaciones_schema.dump(calificaciones_examenes)

    # Envía la respuesta JSON con las calificaciones relacionadas con el examen_id
    return jsonify(calificaciones=calificaciones_serializables)


    
    


