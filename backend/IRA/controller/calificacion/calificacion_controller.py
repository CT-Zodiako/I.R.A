from ...db import db
from ...models.calificacion.schema import CalificacionExamenSchema
from flask import jsonify



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
