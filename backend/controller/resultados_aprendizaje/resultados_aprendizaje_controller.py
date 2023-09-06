from db import db
from models.resultados_aprendizaje.schemas import ResultadoAprendizajeSchema
from models.resultados_aprendizaje.resultados_aprendizaje_model import ResultadoAprendizaje
from models.resultados_aprendizaje.enum import EstadoEnum


def crear_resultado_aprendizaje(data):
    try:
        
        sResultado = ResultadoAprendizajeSchema()
        resultado = sResultado.load(data)
        db.session.add(resultado)
        db.session.commit()
        
        return {
            'status': 200,
            'mensaje' : 'Resultado de aprendizaje creado exitosamente',
        }

    except Exception as e:
        return {
            'status': 500,
            'mensaje' : 'Fallo al crear resultado de aprendizaje',
            'error': f'Ocurrió un error interno en el controllador'
        }

def traer_resultados_aprendizaje():
    try:
        sResultado = ResultadoAprendizajeSchema(many=True)
        resultados = ResultadoAprendizaje.query.all()

        for resultado in resultados:
            resultado.estado = resultado.estado.value

        data = sResultado.dump(resultados)
        return {
            'status': 200,
            'mensaje' : 'Resultados de aprendizaje obtenidos exitosamente',
            'data': data
        }

    except Exception as e:
        return {
            'status': 500,
            'mensaje' : 'Fallo al obtener resultados de aprendizaje',
            'error': f'Ocurrió un error interno en el controllador'
        }


def cambiar_estado_resultado_aprendizaje(resultado_id, nuevo_estado):
    try:
        resultado = ResultadoAprendizaje.query.get(resultado_id)

        if resultado is None:
            return {
                'status': 404,
                'mensaje': 'Resultado de aprendizaje no encontrado',
            }

        if nuevo_estado not in [estado.value for estado in EstadoEnum]:
            return {
                'status': 400,
                'mensaje': 'Error al cambiar el estado del resultado de aprendizaje',
                'error': 'Estado no válido',
            }

        resultado.cambiar_estado(nuevo_estado)
        db.session.commit()

        return {
            'status': 200,
            'mensaje': 'Estado del resultado de aprendizaje actualizado exitosamente',
        }
    except Exception as e:
        return {
            'status': 500,
            'mensaje': 'Fallo al cambiar el estado del resultado de aprendizaje',
            'error': f'Ocurrió un error interno en el controlador: {str(e)}',
        }