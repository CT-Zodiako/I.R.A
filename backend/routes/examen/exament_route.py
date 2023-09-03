from flask import Blueprint, request, jsonify
from controller.examen.examen_controller import agregar_examen
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

    resultado = agregar_examen(programa=programa,
            proyecto_integrador=proyecto_integrador,
            evaluadores=evaluadores,
            actividades_formativas=actividades_formativas,
            estudiantes=estudiantes)
    


    return jsonify(generar_respuesta( resultado["status"], resultado["mensaje"],resultado["data"]))

 