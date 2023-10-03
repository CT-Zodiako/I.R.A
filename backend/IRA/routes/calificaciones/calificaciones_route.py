from ...db import db
from flask import Blueprint, request, jsonify
from ...controller.calificacion.calificacion_controller import guardar_calificacion_db
from ...models.examen.examen_model import Examen
calificaciones_blueprint = Blueprint('calificaciones', __name__)


@calificaciones_blueprint.route('/guardar_calificacion', methods=['POST'])
def guardar_calificacion():
    return guardar_calificacion_db(data=request.json)

@calificaciones_blueprint.route('/actividades_examen/<int:id_examen>', methods=['GET'])
def obtener_actividades_formativas_por_id_examen(id_examen):
    try:
        examen = Examen.query.filter_by(id=id_examen).first()
        
        if examen:
            return jsonify(examen.actividades_formativas)
        else:
            return jsonify({"error": "Examen no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

