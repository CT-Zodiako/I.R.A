from db import db
from flask import jsonify
from models.evaluador.evaluador_model import Evaluador
from models.evaluador.exceptions import CampoRequeridoError, EvaluadorDuplicadoError, EvaluadorNoEncontradoError, ErrorGenerico


def agregar_evaluador(nombre_evaluador, correo, numero_identificacion, rol, contrasenna, telefono):
    try:
        nuevo_evaluador = Evaluador(nombre_evaluador=nombre_evaluador, correo=correo, numero_identificacion=numero_identificacion, rol=rol, contrasenna=contrasenna,telefono=telefono)
        db.session.add(nuevo_evaluador)
        db.session.commit()

    except ErrorGenerico as e:
        return jsonify({"error": str(e)}), 500

    except Exception as e:
        return jsonify({"error": "Ocurrió un error interno en el servidor."}), 500
