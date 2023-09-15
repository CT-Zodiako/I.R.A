from flask import Blueprint, request, jsonify
from ...controller.evaluador.evaluador_controller import agregar_evaluador, traer_evaluadores_db, traer_evaluadores_examen_db, eliminar_evaluador_sf
from ...db import db
from ...models.evaluador.evaluador_model import Evaluador


evaluador_blueprint = Blueprint('evaluador', __name__)


@evaluador_blueprint.route('/agregar_evaluador', methods=['POST'])
def crear_evaluador():
    data = request.json
    return agregar_evaluador(data)


@evaluador_blueprint.route('/traer_evaluadores', methods=['GET'])
def traer_evaluadores():
    return traer_evaluadores_db()


@evaluador_blueprint.route('/examenes_evaluador', methods=['GET'])
def obtener_examenes_por_evaluador():
    evaluador_id = request.args.get('evaluador_id')
    return traer_evaluadores_examen_db(evaluador_id)


@evaluador_blueprint.route('/eliminar_evaluador/<int:evaluador_id>', methods=['DELETE'])
def eliminar_evaluador(evaluador_id):
    return eliminar_evaluador_sf(evaluador_id)