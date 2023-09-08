from flask import Blueprint, request, jsonify
from controller.evaluador.evaluador_controller import agregar_evaluador, traer_evaluadores_db
from helpers.generar_respuesta_helper import generar_respuesta


evaluador_blueprint = Blueprint('evaluador', __name__)


@evaluador_blueprint.route('/agregar_evaluador', methods=['POST'])
def crear_evaluador():
    data = request.json
    nombre_evaluador = data.get('nombre_evaluador')
    correo = data.get('correo')
    numero_identificacion = data.get('numero_identificacion')
    rol = data.get('rol')
    contrasenna = data.get('contrasenna')
    telefono = data.get('telefono')

    resultado = agregar_evaluador(nombre_evaluador=nombre_evaluador, correo=correo,
                                    numero_identificacion=numero_identificacion, rol=rol, contrasenna=contrasenna, telefono=telefono)
    return jsonify(generar_respuesta( resultado["status"], resultado["mensaje"],resultado["data"]))

@evaluador_blueprint.route('/traer_evaluadores', methods=['GET'])
def traer_evaluadores():
    resultados = traer_evaluadores_db()
    print(f"Resultados: {resultados}")
    return  jsonify(resultados)
    

