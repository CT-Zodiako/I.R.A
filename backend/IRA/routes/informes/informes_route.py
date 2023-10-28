from flask import Blueprint, request, jsonify
from ...controller.informes.informes_controller import traer_calificaciones_db
from ...models.calificacion.calificacion_model import CalificacionExamen
from ...models.calificacion.schema import CalificacionExamenSchema


informes_blueprint = Blueprint('informes', __name__)

@informes_blueprint.route('/traer_calificaciones', methods=['GET'])
def traer_calificaciones():
    return traer_calificaciones_db()

from flask import jsonify
from enum import Enum

class CalificacionEnum(Enum):
    EXCELENTE = {'label': 'EXCELENTE', 'color': 'green', 'nota': 5}
    SOBRESALIENTE = {'label': 'SOBRESALIENTE', 'color': 'blue', 'nota': 4}
    SUFICIENTE = {'label': 'SUFICIENTE', 'color': 'orange', 'nota': 3}
    INSUFICIENTE = {'label': 'INSUFICIENTE', 'color': 'red' , 'nota': 2}
    NO_CUMPLE = {'label': 'NO CUMPLE', 'color': 'gray', 'nota': 1}
    NINGUNA_CALIFICACION = {'label': 'NINGUNA CALIFICACION', 'color': 'yellow', 'nota': 0}

@informes_blueprint.route('/calificacion_by_id_examen/<int:examen_id>', methods=['GET'])
def obtener_calificaciones_por_examen(examen_id):
    # Realiza una consulta para obtener la calificación relacionada con el examen_id
    calificacion_examen = CalificacionExamen.query.filter_by(examen_id=examen_id).first()

    if not calificacion_examen:
        return jsonify(message="No se encontró calificación para el examen especificado"), 404

    # Obtén el campo "calificacion" del objeto CalificacionExamen
    calificacion_lista = calificacion_examen.calificacion

    # Inicializa el diccionario de conteo utilizando el Enum
    conteo_calificaciones = {nota.value['label']: 0 for nota in CalificacionEnum}

    # Recorre cada elemento de la lista de calificaciones
    for elemento in calificacion_lista:
        if "calificacion" in elemento and "notas" in elemento["calificacion"]:
            # Calcula el promedio de notas
            notas = elemento["calificacion"]["notas"]
            promedio = sum(notas) / len(notas) if len(notas) > 0 else None
            # Agrega el promedio al elemento
            elemento["calificacion"]["promedio"] = promedio
            # Clasifica el promedio en un rango y aumenta el conteo utilizando las etiquetas
            for nota in CalificacionEnum:
                if nota.value['nota'] == int(promedio):
                    conteo_calificaciones[nota.value['label']] += 1

    # Agrega el conteo al JSON de respuesta en una llave "conteo"
    response_data = {"calificaciones": calificacion_lista, "conteo": conteo_calificaciones}
    return jsonify(response_data)










    
    


