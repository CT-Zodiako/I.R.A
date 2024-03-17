from flask import Blueprint, jsonify
from ...controller.informes.informes_controller import traer_calificaciones_por_examen
from ...models.calificacion.calificacion_model import CalificacionExamen
from ...auth import admin_required
from enum import Enum

informes_blueprint = Blueprint('informes', __name__)


@informes_blueprint.route('/traer_calificaciones/<int:examen_id>', methods=['GET'])
# @admin_required
def traer_calificaciones(examen_id):
    print(traer_calificaciones_por_examen(examen_id))
    return traer_calificaciones_por_examen(examen_id)


class CalificacionEnum(Enum):
    EXCELENTE = {'label': 'EXCELENTE', 'color': 'green', 'nota': 5}
    SOBRESALIENTE = {'label': 'SOBRESALIENTE', 'color': 'blue', 'nota': 4}
    SUFICIENTE = {'label': 'SUFICIENTE', 'color': 'orange', 'nota': 3}
    INSUFICIENTE = {'label': 'INSUFICIENTE', 'color': 'red', 'nota': 2}
    NO_CUMPLE = {'label': 'NO CUMPLE', 'color': 'gray', 'nota': 1}
    NINGUNA_CALIFICACION = {
        'label': 'NINGUNA CALIFICACION', 'color': 'yellow', 'nota': 0}


def procesar_calificaciones(calificacion_lista):
    conteo_calificaciones = {
        nota.value['label']: 0 for nota in CalificacionEnum}

    for elemento in calificacion_lista:
        if "calificacion" in elemento and "notas" in elemento["calificacion"]:
            notas = elemento["calificacion"]["notas"]
            promedio = sum(notas) / len(notas) if len(notas) > 0 else None
            elemento["calificacion"]["promedio"] = promedio
            for nota in CalificacionEnum:
                if nota.value['nota'] == int(promedio):
                    conteo_calificaciones[nota.value['label']] += 1

    return {"calificaciones": calificacion_lista, "conteo": conteo_calificaciones}


@informes_blueprint.route('/calificacion_by_id_examen/<int:examen_id>', methods=['GET'])
# @admin_required
def obtener_calificaciones_por_examen(examen_id):
    calificaciones_examenes = CalificacionExamen.query.filter_by(
        examen_id=examen_id).all()

    if not calificaciones_examenes:
        return jsonify(message="No se encontraron calificaciones para el examen especificado"), 404

    # Procesar calificaciones de todos los exámenes relacionados
    calificacion_lista = []
    for calificacion_examen in calificaciones_examenes:
        calificacion_lista.extend(calificacion_examen.calificacion)

    response_data = procesar_calificaciones(calificacion_lista)

    return jsonify(response_data)


@informes_blueprint.route('/informe/<int:examen_id>', methods=['GET'])
def getInforme(examen_id):
    calificaciones_examenes = CalificacionExamen.query.filter_by(
        examen_id=examen_id).all()

    # Convertir calificaciones_examenes a una lista de diccionarios
    todosLosExamenes = []

    for resputestaEvaludor in calificaciones_examenes:
        todosLosExamenes.append({
            'id': resputestaEvaludor.id,
            'examen_id': resputestaEvaludor.examen_id,
            'calificaciones': resputestaEvaludor.calificacion,
            'evaluador_id': resputestaEvaludor.evaluador_id,
        })

    # Diccionario para almacenar las notas de cada estudiante por actividad y evaluador
    notas_por_estudiante_y_actividad = {}

    # Contadores para cada clasificación de calificación
    contador_clasificaciones = {
        "excelente": 0,
        "sobresaliente": 0,
        "suficiente": 0,
        "insuficiente": 0,
        "no cumple": 0,
        "no calificación": 0
    }

    # Iterar sobre los objetos en la lista de datos
    for evaluacion in todosLosExamenes:
        examen_id = evaluacion["examen_id"]
        evaluador_id = evaluacion["evaluador_id"]

        # Iterar sobre las calificaciones en cada evaluación
        for calificacion in evaluacion["calificaciones"]:
            estudiante = calificacion["nombre"].strip()
            notas = calificacion["calificacion"]["notas"]

            # Agregar las notas al diccionario
            if estudiante not in notas_por_estudiante_y_actividad:
                notas_por_estudiante_y_actividad[estudiante] = []

            for i, nota in enumerate(notas):
                if i >= len(notas_por_estudiante_y_actividad[estudiante]):
                    notas_por_estudiante_y_actividad[estudiante].append([])

                notas_por_estudiante_y_actividad[estudiante][i].append(
                    float(nota))

    # Calcular el promedio general por estudiante
    promedio_general_por_estudiante = {}
    for estudiante, notas_por_actividad in notas_por_estudiante_y_actividad.items():
        promedio_general_por_estudiante[estudiante] = []
        for actividad_notas in notas_por_actividad:
            promedio_actividad = sum(actividad_notas) / len(actividad_notas)
            promedio_general_por_estudiante[estudiante].append(
                promedio_actividad)

    # Calcular el promedio general para cada estudiante
    for estudiante, promedio_actividades in promedio_general_por_estudiante.items():
        promedio_general = sum(promedio_actividades) / \
            len(promedio_actividades)

        # Clasificar el promedio y contar
        clasificacion = clasificar_promedio(promedio_general)
        contador_clasificaciones[clasificacion] += 1

    # Devolver el conteo en formato JSON usando jsonify
    return jsonify(contador_clasificaciones)


# Función para clasificar los promedios
def clasificar_promedio(promedio):
    if promedio == 5:
        return "excelente"
    elif promedio >= 4:
        return "sobresaliente"
    elif promedio >= 3:
        return "suficiente"
    elif promedio >= 2:
        return "insuficiente"
    elif promedio >= 1:
        return "no cumple"
    else:
        return "no calificación"


@informes_blueprint.route('/informeActividad/<int:examen_id>', methods=['GET'])
def getInformeActividad(examen_id):
    calificaciones_examenes = CalificacionExamen.query.filter_by(
        examen_id=examen_id).all()

    # Convertir calificaciones_examenes a una lista de diccionarios
    todosLosExamenes = []

    for resputestaEvaludor in calificaciones_examenes:
        todosLosExamenes.append({
            'id': resputestaEvaludor.id,
            'examen_id': resputestaEvaludor.examen_id,
            'calificaciones': resputestaEvaludor.calificacion,
            'evaluador_id': resputestaEvaludor.evaluador_id,
        })
    
    # Crear un diccionario para almacenar las sumas de las notas por actividad
    sumas_por_actividad = {}
    for evaluador in todosLosExamenes:
        for i, calificacion in enumerate(evaluador['calificaciones']):
            notas = calificacion['calificacion']['notas']
            # Actualizar la suma de las notas por actividad
            if i not in sumas_por_actividad:
                sumas_por_actividad[i] = [0] * len(notas)
            for j, nota in enumerate(notas):
                sumas_por_actividad[i][j] += int(nota)

    # Calcular el promedio final por actividad
    promedios_por_actividad = {}
    for actividad, sumas in sumas_por_actividad.items():
        promedios_por_actividad[actividad] = [suma / len(todosLosExamenes) for suma in sumas]

    # Clasificar los promedios de notas por actividad
    clasificacion_promedios_por_actividad = clasificar_promedios_por_actividad(promedios_por_actividad)

    # Retornar la clasificación de promedios por actividad en formato JSON
    return jsonify(clasificacion_promedios_por_actividad)


# Función para clasificar los promedios de notas por actividad
def clasificar_promedios_por_actividad(promedios_por_estudiante):
    clasificacion_por_actividad = {}
    for estudiante, promedios in promedios_por_estudiante.items():
        for i, promedio in enumerate(promedios):
            # Crear la clasificación por actividad si aún no existe
            if i not in clasificacion_por_actividad:
                clasificacion_por_actividad[i] = {
                    "excelente": 0,
                    "sobresaliente": 0,
                    "suficiente": 0,
                    "insuficiente": 0,
                    "no cumple": 0,
                    "no calificación": 0
                }
            # Clasificar el promedio de notas
            if promedio == 5:
                clasificacion_por_actividad[i]["excelente"] += 1
            elif promedio >= 4:
                clasificacion_por_actividad[i]["sobresaliente"] += 1
            elif promedio >= 3:
                clasificacion_por_actividad[i]["suficiente"] += 1
            elif promedio >= 2:
                clasificacion_por_actividad[i]["insuficiente"] += 1
            elif promedio >= 1:
                clasificacion_por_actividad[i]["no cumple"] += 1
            else:
                clasificacion_por_actividad[i]["no calificación"] += 1
    return clasificacion_por_actividad
