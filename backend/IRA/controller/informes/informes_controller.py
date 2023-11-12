from ...models.calificacion.schema import CalificacionExamenSchema
from ...db import db
from flask import jsonify
from ...models.calificacion.calificacion_model import CalificacionExamen
from enum import Enum

from flask import jsonify
from collections import defaultdict

class CalificacionEnum(Enum):
    EXCELENTE = {'label': 'EXCELENTE', 'color': 'green', 'nota': 5}
    SOBRESALIENTE = {'label': 'SOBRESALIENTE', 'color': 'blue', 'nota': 4}
    SUFICIENTE = {'label': 'SUFICIENTE', 'color': 'orange', 'nota': 3}
    INSUFICIENTE = {'label': 'INSUFICIENTE', 'color': 'red', 'nota': 2}
    NO_CUMPLE = {'label': 'NO CUMPLE', 'color': 'gray', 'nota': 1}
    NINGUNA_CALIFICACION = {'label': 'NINGUNA CALIFICACION', 'color': 'yellow', 'nota': 0}

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
    promedios_actividades = defaultdict(list)
    conteo_calificaciones = defaultdict(int)
    conteo_actividades = defaultdict(lambda: defaultdict(int))

    for calificacion_examen in calificaciones_examenes:
        calificacion_serializable = {
            "id": calificacion_examen.id,
            "examen_id": calificacion_examen.examen_id,
            "evaluador_id": calificacion_examen.evaluador_id,
            "calificacion": []
        }

        estudiantes_unicos = set()

        for estudiante in calificacion_examen.calificacion:
            nombre_estudiante = estudiante["nombre"]
            notas_estudiante = estudiante["calificacion"]["notas"]
            promedio_notas = sum(notas_estudiante) / len(notas_estudiante) if len(notas_estudiante) > 0 else None

            calificacion_estudiante = {
                "nombre": nombre_estudiante,
                "calificacion": {
                    "notas": notas_estudiante,
                    "observaciones": estudiante["calificacion"]["observaciones"],
                    "promedio": promedio_notas
                }
            }

            calificacion_serializable["calificacion"].append(calificacion_estudiante)

            # Almacenar los promedios por estudiante
            promedios_estudiantes[nombre_estudiante].append(promedio_notas)

            # Almacenar los promedios por actividad
            for i, nota in enumerate(notas_estudiante):
                actividad = f"Actividad{i + 1}"
                promedios_actividades[actividad].append(nota)

                # Conteo según el enum por actividad
                calificacion_actividad = clasificar_calificacion(nota)
                conteo_actividades[actividad][calificacion_actividad] += 1

            # Agregar estudiante a la lista de estudiantes únicos
            estudiantes_unicos.add(nombre_estudiante)

        calificaciones_serializables.append(calificacion_serializable)

    # Calcular el promedio de promedios por estudiante
    promedio_promedios_estudiantes = {}

    for estudiante, promedios in promedios_estudiantes.items():
        promedio_final = sum(promedios) / len(promedios) if len(promedios) > 0 else None
        calificacion_final = clasificar_calificacion(promedio_final)

        # Almacenar el promedio final por estudiante
        promedio_promedios_estudiantes[estudiante] = promedio_final

        # Agregar al conteo
        conteo_calificaciones[calificacion_final] += 1

    # Calcular el promedio de promedios por actividad
    promedio_promedios_actividades = {}

    for actividad, notas in promedios_actividades.items():
        promedio_actividad = sum(notas) / len(notas) if len(notas) > 0 else None
        calificacion_actividad = clasificar_calificacion(promedio_actividad)

        # Almacenar el promedio final por actividad
        promedio_promedios_actividades[actividad] = promedio_actividad

    return jsonify(
        calificaciones=calificaciones_serializables,
        promedio_promedios_estudiantes=promedio_promedios_estudiantes,
        conteo=conteo_calificaciones,
        promedio_promedios_actividades=promedio_promedios_actividades,
        conteo_actividades=conteo_actividades
    )
