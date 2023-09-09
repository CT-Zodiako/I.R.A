from flask import Blueprint, request, jsonify
from controller.examen.examen_controller import agregar_examen
from helpers.generar_respuesta_helper import generar_respuesta


examen_blueprint = Blueprint('examen', __name__)


@examen_blueprint.route('/crear_examen', methods=['POST'])
def crear_examen():
    data = request.json
    return agregar_examen(data)
