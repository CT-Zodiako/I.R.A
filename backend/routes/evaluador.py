from flask import Blueprint, request,jsonify
from controller.evaluador_controller import agregar_evaluador

evaluador_blueprint = Blueprint('evaluador', __name__)

@evaluador_blueprint.route('/agregar_evaluador', methods=['POST'])
def crear_evaluador():
    data = request.json
    nombre_evaluador = data.get('nombre_evaluador')
    correo = data.get('correo')
    numero_identifiacion = data.get('numero_identifiacion')
    rol = data.get('rol')
    contrasenna = data.get('contrasenna')
    telefono = data.get('telefono')

    nuevo_evaluador = agregar_evaluador(nombre_evaluador=nombre_evaluador, correo=correo,
                                numero_identifiacion=numero_identifiacion, rol=rol, contrasenna=contrasenna, telefono=telefono)

    return nuevo_evaluador
    # return jsonify({"mensaje": "Evaluador agregado exitosamente", "evaluador": {
    #     "nombre_evaluador": nuevo_evaluador.nombre_evaluador,
    #     "correo": nuevo_evaluador.correo,
    #     "numero_identifiacion": nuevo_evaluador.numero_identifiacion,
    #     "rol": nuevo_evaluador.rol,
    #     "contrasenna": nuevo_evaluador.contrasenna,
    #     "telefono": nuevo_evaluador.telefono
    # }})
