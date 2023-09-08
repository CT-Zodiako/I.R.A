from db import db
from flask import jsonify
from models.examen.examen_model import Examen
from models.evaluador.evaluador_model import Evaluador
from models.relaciones.relacion_examen_evaluador import examen_evaluador_association


def agregar_examen(programa, proyecto_integrador, evaluadores, actividades_formativas, estudiantes, resultado_aprendizaje_id):
    try:
        resultado = Examen(programa=programa, proyecto_integrador=proyecto_integrador, evaluadores=evaluadores, actividades_formativas=actividades_formativas, estudiantes=estudiantes, resultado_aprendizaje_id=resultado_aprendizaje_id)
        asignar_examen_evaluador(resultado,evaluadores)
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

def asignar_examen_evaluador(examen, evaluadores):
    try:
        # Supongamos que 'examen' es una instancia de Examen y 'evaluadores' es un diccionario
        for key, value in evaluadores.items():
            # Obtiene el ID del evaluador del diccionario
            evaluador_id = value.get('data')['id']
            print(f"ID del evaluador: {evaluador_id}")
            
            
            # Busca el evaluador por su ID en la base de datos
            evaluador = Evaluador.query.get(evaluador_id)
            print(evaluador)

            # Asigna el evaluador al examen
            if evaluador:
                examen_evaluador_association.append(evaluador)
                db.session.commit()
                print(f"Evaluador con ID {evaluador_id} asignado al examen con ID {examen.id}")
            else:
                print(f"No se encontró el evaluador con ID {evaluador_id}")

        return {
            'status': 200,
            'mensaje': 'Evaluadores asignados al examen',
        }

    except Exception as e:
        return {
            'status': 500,
            'mensaje': 'Fallo al asignar evaluadores',
            'data': f'Ocurrió un error interno en el servidor. {e}'
        }
