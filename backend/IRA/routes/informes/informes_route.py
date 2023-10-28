from flask import Blueprint, request, jsonify
from ...controller.informes.informes_controller import traer_calificaciones_db
from ...models.calificacion.calificacion_model import CalificacionExamen
from ...models.calificacion.schema import CalificacionExamenSchema


informes_blueprint = Blueprint('informes', __name__)

@informes_blueprint.route('/traer_calificaciones', methods=['GET'])
def traer_calificaciones():
    return traer_calificaciones_db()

from flask import jsonify, request, make_response


@informes_blueprint.route('/calificacion_by_id_examen/<int:examen_id>', methods=['GET'])
def obtener_calificaciones_por_examen(examen_id):
    # Realiza una consulta para obtener la calificación relacionada con el examen_id
    calificacion_examen = CalificacionExamen.query.filter_by(examen_id=examen_id).first()

    if not calificacion_examen:
        return jsonify(message="No se encontró calificación para el examen especificado"), 404

    # Obtén el campo "calificacion" del objeto CalificacionExamen
    calificacion_lista = calificacion_examen.calificacion

    # Inicializa variables para calcular el promedio
    suma_notas = 0
    cantidad_notas = 0

    for elemento in calificacion_lista:
        # Si hay un elemento con clave "notas", sumar sus valores
        if "notas" in elemento.get("calificacion", {}):
            suma_notas += sum(elemento["calificacion"]["notas"])
            cantidad_notas += len(elemento["calificacion"]["notas"])

    # Calcula el promedio
    promedio = suma_notas / cantidad_notas if cantidad_notas > 0 else None

    # Agrega el promedio al JSON de respuesta
    calificacion_lista.append({"promedio": promedio})

    
    return jsonify(calificaciones=calificacion_lista)






    
    


