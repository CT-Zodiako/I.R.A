from flask import Blueprint, request, jsonify
from ...controller.informes.informes_controller import traer_calificaciones_db
from ...models.calificacion.calificacion_model import CalificacionExamen
from ...models.calificacion.schema import CalificacionExamenSchema


informes_blueprint = Blueprint('informes', __name__)

@informes_blueprint.route('/traer_calificaciones', methods=['GET'])
def traer_calificaciones():
    return traer_calificaciones_db()

from flask import jsonify, request, make_response


from flask import jsonify

@informes_blueprint.route('/calificacion_by_id_examen/<int:examen_id>', methods=['GET'])
def obtener_calificaciones_por_examen(examen_id):
    # Realiza una consulta para obtener la calificación relacionada con el examen_id
    calificacion_examen = CalificacionExamen.query.filter_by(examen_id=examen_id).first()

    if not calificacion_examen:
        return jsonify(message="No se encontró calificación para el examen especificado"), 404

    # Obtén el campo "calificacion" del objeto CalificacionExamen
    calificacion_lista = calificacion_examen.calificacion

    # Recorre cada elemento de la lista de calificaciones
    for elemento in calificacion_lista:
        # Si el elemento tiene la clave "calificacion" y esta contiene "notas"
        if "calificacion" in elemento and "notas" in elemento["calificacion"]:
            # Calcula el promedio de notas
            notas = elemento["calificacion"]["notas"]
            promedio = sum(notas) / len(notas) if len(notas) > 0 else None
            # Agrega el promedio al elemento
            elemento["calificacion"]["promedio"] = promedio

    # Devuelve la lista de calificaciones actualizada con los promedios
    return jsonify(calificaciones=calificacion_lista)







    
    


