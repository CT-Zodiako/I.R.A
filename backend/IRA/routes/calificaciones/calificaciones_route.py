from ...db import db
from flask import Blueprint, request, jsonify
from ...controller.calificacion.calificacion_controller import guardar_calificacion_db
from ...models.examen.examen_model import Examen
calificaciones_blueprint = Blueprint('calificaciones', __name__)


@calificaciones_blueprint.route('/guardar_calificacion', methods=['POST'])
def guardar_calificacion():
    return guardar_calificacion_db(data=request.json)

@calificaciones_blueprint.route('/actividades_examen', methods=['GET'])
def obtener_actividades_formativas_por_id_examen():
    try:
        id_examen = request.json['id_examen']
        examen = Examen.query.filter_by(id=id_examen).first()
        
        if examen:
            return jsonify(examen.actividades_formativas)
        else:
            return None  # Si el examen no existe, retorna None o un mensaje de error
    except Exception as e:
        return str(e)
