from flask import Blueprint, request, jsonify
from controller.evaluador.evaluador_controller import agregar_evaluador
from models.evaluador.exceptions import ErrorGenerico


evaluador_blueprint = Blueprint('evaluador', __name__)


@evaluador_blueprint.route('/agregar_evaluador', methods=['POST'])
def crear_evaluador():
    try:
        data = request.json
        nombre_evaluador = data.get('nombre_evaluador')
        correo = data.get('correo')
        numero_identificacion = data.get('numero_identificacion')
        rol = data.get('rol')
        contrasenna = data.get('contrasenna')
        telefono = data.get('telefono')

        resultado = agregar_evaluador(nombre_evaluador=nombre_evaluador, correo=correo,
                                      numero_identificacion=numero_identificacion, rol=rol, contrasenna=contrasenna, telefono=telefono)
        return resultado

    except ErrorGenerico as e:
        return jsonify({"error": str(e)}), 500

    except Exception as e:
        return jsonify({"error": "Ocurrió un error en la ruta."}), 500
