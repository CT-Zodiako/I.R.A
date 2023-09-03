from db import db
from flask import jsonify
from models.resultados_aprendizaje.resultados_aprendizaje_model import ResultadoAprendizaje


def crear_resultado_aprendizaje(titulo,descripcion,estado):
    try:
        resultado = ResultadoAprendizaje(titulo=titulo,descripcion=descripcion,estado=estado)
        db.session.add(resultado)
        db.session.commit()
        
        return {
            'status': 200,
            'mensaje' : 'Resultado aprendizaje creado',
            'data': {
                'titulo': resultado.titulo,
                'descripcion': resultado.descripcion,
                'estado': resultado.estado
            }
        }

    except Exception as e:
        return {
            'status': 500,
            'mensaje' : 'Fallo para crear resultado de aprendizaje',
            'data': f'Ocurrió un error interno en el servidor. {e}'
        }
