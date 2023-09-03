from flask import Blueprint, request, jsonify
from controller.examen.examen_controller import crear_examen
from helpers.generar_respuesta_helper import generar_respuesta


examen_blueprint = Blueprint('examen', __name__)


@examen_blueprint.route('/crear_examen', methods=['POST'])
def crear_examen():
    data = request.json
    programa = data.get('programa')
    proyecto_integrador = data.get('proyecto_integrador')
    evaluadores = data.get('evaluadores')
    actividades_formativas = data.get('actividades_formativas')
    estudiantes = data.get('estudiantes')

    resultado = crear_examen(programa, proyecto_integrador, evaluadores, actividades_formativas, estudiantes)
    


    return jsonify(generar_respuesta( resultado["status"], resultado["mensaje"],resultado["data"]))

 