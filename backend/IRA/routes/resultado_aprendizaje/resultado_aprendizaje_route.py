from flask import Blueprint, request, jsonify
from ...controller.resultados_aprendizaje.resultados_aprendizaje_controller import crear_resultado_aprendizaje,  traer_resultados_aprendizaje, cambiar_estado_resultado_db,get__resultados_by_estado
from ...auth import admin_required

resultado_aprendizaje_blueprint = Blueprint('resultado_aprendizaje', __name__)


@resultado_aprendizaje_blueprint.route('/crear_resultado', methods=['POST'])
@admin_required
def crear_resultado():
    data = request.get_json()
    resultado = crear_resultado_aprendizaje(data)
    return resultado


@resultado_aprendizaje_blueprint.route('/traer_resultados', methods=['GET'])
@admin_required
def traer_resultados():
    resultados = traer_resultados_aprendizaje()
    return jsonify(resultados)


@resultado_aprendizaje_blueprint.route('/cambiar_estado_resultado/<int:resultado_id>', methods=['PUT'])
@admin_required
def cambiar_estado_resultado(resultado_id):
    return cambiar_estado_resultado_db(resultado_id)


@resultado_aprendizaje_blueprint.route('/traerResultadoByEstado', methods=['GET'])
@admin_required
def traer_resultado_by_estado():
    resultados = get__resultados_by_estado()
    return jsonify(resultados)
