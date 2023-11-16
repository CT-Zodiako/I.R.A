from ...models.calificacion.schema import CalificacionExamenSchema
from ...db import db
from flask import jsonify
from ...models.calificacion.calificacion_model import CalificacionExamen
from enum import Enum

from flask import jsonify
from collections import defaultdict
from collections import Counter
from ...models.evaluador.evaluador_model import Evaluador


class CalificacionEnum(Enum):
    EXCELENTE = {'label': 'EXCELENTE', 'color': '#9AFE2E', 'nota': 5}
    SOBRESALIENTE = {'label': 'SOBRESALIENTE', 'color': '#2E64FE', 'nota': 4}
    SUFICIENTE = {'label': 'SUFICIENTE', 'color': '#FACC2E', 'nota': 3}
    INSUFICIENTE = {'label': 'INSUFICIENTE', 'color': '#FE2E2E', 'nota': 2}
    NO_CUMPLE = {'label': 'NO CUMPLE', 'color': '#A4A4A4', 'nota': 1}
    NINGUNA_CALIFICACION = {'label': 'NINGUNA CALIFICACION', 'color': '#F7FE2E', 'nota': 0}

def clasificar_calificacion(promedio):
    for nota in CalificacionEnum:
        if nota.value['nota'] == int(promedio):
            return nota.value['label']

def traer_calificaciones_por_examen(examen_id):
    calificaciones_examenes = CalificacionExamen.query.filter_by(examen_id=examen_id).all()

    if not calificaciones_examenes:
        return jsonify(message="No se encontraron calificaciones para el examen especificado"), 404

    calificaciones_serializables = []
    promedios_estudiantes = defaultdict(list)
    conteo_calificaciones = defaultdict(int)
    conteo_actividades_estudiantes = defaultdict(lambda: defaultdict(int))
    observaciones_totales = []
    evaluadores_totales = []  # Lista para almacenar los evaluadores

    for calificacion_examen in calificaciones_examenes:
        evaluador = Evaluador.query.get(calificacion_examen.evaluador_id)  # Obtener el objeto Evaluador

        calificacion_serializable = {
            "id": calificacion_examen.id,
            "examen_id": calificacion_examen.examen_id,
            "evaluador_id": calificacion_examen.evaluador_id,
            "evaluador_nombre": evaluador.nombre_evaluador if evaluador else None,  # Añadir el nombre del evaluador
            "calificacion": []
        }

        for estudiante in calificacion_examen.calificacion:
            nombre_estudiante = estudiante["nombre"]
            notas_estudiante = estudiante["calificacion"]["notas"]
            observaciones_estudiante = estudiante["calificacion"]["observaciones"]
            promedio_notas = round(sum(notas_estudiante) / len(notas_estudiante)) if len(notas_estudiante) > 0 else None

            calificacion_estudiante = {
                "nombre": nombre_estudiante,
                "calificacion": {
                    "notas": notas_estudiante,
                    "observaciones": observaciones_estudiante,
                    "promedio": promedio_notas
                }
            }

            calificacion_serializable["calificacion"].append(calificacion_estudiante)
            promedios_estudiantes[nombre_estudiante].append(promedio_notas)

            for i, nota in enumerate(notas_estudiante):
                actividad = f"Actividad{i + 1}"
                conteo_actividades_estudiantes[actividad][nombre_estudiante] = clasificar_calificacion(nota)

            observaciones_totales.extend(observaciones_estudiante)

        evaluadores_totales.append(evaluador.nombre_evaluador if evaluador else None)  # Añadir el nombre del evaluador a la lista

        calificaciones_serializables.append(calificacion_serializable)

    for estudiante, promedios in promedios_estudiantes.items():
        promedio_final = round(sum(promedios) / len(promedios)) if len(promedios) > 0 else None
        calificacion_final = clasificar_calificacion(promedio_final)
        conteo_calificaciones[calificacion_final] += 1

    conteo_actividades = defaultdict(int)

    for actividad, estudiantes in conteo_actividades_estudiantes.items():
        conteo_por_actividad = Counter(estudiantes.values())
        conteo_actividades[actividad] = dict(conteo_por_actividad)

    return jsonify(
        calificaciones=calificaciones_serializables,
        conteo=conteo_calificaciones,
        conteo_actividades=conteo_actividades,
        observaciones_totales=observaciones_totales,
        evaluadores_totales=evaluadores_totales
    )