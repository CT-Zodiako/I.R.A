from db import db
from models.resultados_aprendizaje.schemas import ResultadoAprendizajeSchema


def crear_resultado_aprendizaje(data):
    try:
        
        sResultado = ResultadoAprendizajeSchema()
        resultado = sResultado.load(data)
        db.session.add(resultado)
        db.session.commit()
        
        resultado_serializado = sResultado.dump(resultado)
        
        return {
            'status': 200,
            'mensaje' : 'Resultado de aprendizaje creado exitosamente',
            'data': {
                'resultado': resultado_serializado,
            }
        }

    except Exception as e:
        # Devuelve un indicador de error y detalles del error
        return {
            'status': 500,
            'mensaje' : 'Fallo al crear resultado de aprendizaje',
            'data': f'Ocurrió un error interno en el servidor. {str(e)}'
        }


    
