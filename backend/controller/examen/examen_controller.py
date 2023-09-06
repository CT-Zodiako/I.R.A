from db import db
from flask import jsonify
from models.examen.examen_model import Examen


def agregar_examen(programa, proyecto_integrador, evaluadores, actividades_formativas, estudiantes, resultado_aprendizaje_id):
    try:
        resultado = Examen(programa=programa, proyecto_integrador=proyecto_integrador, evaluadores=evaluadores, actividades_formativas=actividades_formativas, estudiantes=estudiantes, resultado_aprendizaje_id=resultado_aprendizaje_id)
        db.session.add(resultado)
        db.session.commit()
        
        return {
            'status': 200,
            'mensaje' : 'Examen creado',
            'data': {
                'programa': resultado.programa,
                'proyecto_integrador': resultado.proyecto_integrador,
                'evaluadores': resultado.evaluadores,
                'actividades_formativas': resultado.actividades_formativas,
                'estudiantes': resultado.estudiantes,
                'resultado_aprendizaje_id': resultado.resultado_aprendizaje_id
            }
        }

    except Exception as e:
        return {
            'status': 500,
            'mensaje' : 'Fallo para agregar examen',
            'data': f'Ocurrió un error interno en el servidor. {e}'
        }
