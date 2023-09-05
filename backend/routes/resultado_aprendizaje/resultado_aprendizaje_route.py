from flask import Blueprint, request
from controller.resultados_aprendizaje.resultados_aprendizaje_controller import crear_resultado_aprendizaje




resultado_aprendizaje_blueprint = Blueprint('resultado_aprendizaje', __name__)


@resultado_aprendizaje_blueprint.route('/crear_resultado', methods=['POST'])
def crear_resultado():
    data= request.get_json()
    resultado = crear_resultado_aprendizaje(data)
    return resultado



    

 