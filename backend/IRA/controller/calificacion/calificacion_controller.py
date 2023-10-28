from ...db import db
from ...models.calificacion.schema import CalificacionExamenSchema
from flask import jsonify
from ...models.examen.examen_model import Examen
from enum import Enum
from ...models.calificacion.calificacion_model import CalificacionExamen



def guardar_calificacion_db(data):
    try:
        sCalificacionExamen = CalificacionExamenSchema()
        CalificacionExamen = sCalificacionExamen.load(data)
        
        db.session.add(CalificacionExamen)
        db.session.commit()
            
        return {
            'status': 201,
            'mensaje': 'Calificacion creada exitosamente',
        }

    except Exception as e:
        return {
            'status': 500,
            'mensaje': 'Fallo al crear calificacion',
            'error': str(e)
        }

def actividades_examen(id_examen):
    try:
        examen = Examen.query.filter_by(id=id_examen).first()
        
        if examen:
            return jsonify(examen.actividades_formativas)
        else:
            return jsonify({"error": "Examen no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def calificaciones_by_id_db(id_examen):
    try:
        examen = CalificacionExamen.query.filter_by(examen_id=id_examen).first()
        
        if examen:
            return jsonify(examen.calificacion)
        else:
            return jsonify({"error": "Examen no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def enum_calificacion():
    try:
        enum_options = [{'label': calificacion.value['label'], 'value': calificacion.name, 'color': calificacion.value['color']} for calificacion in CalificacionEnum]
        return enum_options
    except Exception as e:
        return jsonify({"error en enum calificaiones": str(e)}), 500



class CalificacionEnum(Enum):
    EXCELENTE = {'label': 'EXCELENTE', 'color': 'green', 'nota': 5}
    SOBRESALIENTE = {'label': 'SOBRESALIENTE', 'color': 'blue', 'nota': 4}
    SUFICIENTE = {'label': 'SUFICIENTE', 'color': 'orange', 'nota': 3}
    INSUFICIENTE = {'label': 'INSUFICIENTE', 'color': 'red' , 'nota': 2}
    NO_CUMPLE = {'label': 'NO CUMPLE', 'color': 'gray', 'nota': 1}
    NINGUNA_CALIFICACION = {'label': 'NINGUNA CALIFICACION', 'color': 'yellow', 'nota': 0}
   
