from db import db
from flask import jsonify
from models.evaluador.evaluador_model import Evaluador
from models.evaluador.exceptions import  CampoRequeridoError, EvaluadorDuplicadoError, EvaluadorNoEncontradoError, ErrorGenerico


def agregar_evaluador(nombre_evaluador, correo, numero_identificacion, rol, contrasenna, telefono):
    try:
        nuevo_evaluador = Evaluador(nombre_evaluador=nombre_evaluador, correo=correo, numero_identificacion=numero_identificacion, rol=rol, contrasenna=contrasenna,telefono=telefono)
        db.session.add(nuevo_evaluador)
        db.session.commit()
        
        return {
            'status': 200,
            'mensaje' : 'Evaluador agregado',
            'data': {
                'nombre_evaluador': nuevo_evaluador.nombre_evaluador,
                'correo': nuevo_evaluador.correo,
                'numero_identificacion': nuevo_evaluador.numero_identificacion,
                'rol': nuevo_evaluador.rol,
                'contrasenna': nuevo_evaluador.contrasenna,
                'telefono': nuevo_evaluador.telefono
            }
        }

    except Exception as e:
        return {
            'status': 500,
            'mensaje' : 'Fallo para agregar evalaudor',
            'data': f'Ocurrió un error interno en el servidor. {e}'
        }
