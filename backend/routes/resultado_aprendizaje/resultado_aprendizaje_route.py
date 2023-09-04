from flask import Blueprint, request, jsonify
from controller.resultados_aprendizaje.resultados_aprendizaje_controller import crear_resultado_aprendizaje,traer_todos_resultados
from helpers.generar_respuesta_helper import generar_respuesta


resultado_aprendizaje_blueprint = Blueprint('resultado_aprendizaje', __name__)


@resultado_aprendizaje_blueprint.route('/crear_resultado', methods=['POST'])
def crear_resultado():
    data = request.json    
    
    titulo = data.get('titulo')
    descripcion = data.get('descripcion')
    estado = data.get('estado')

    resultado = crear_resultado_aprendizaje(titulo=titulo,descripcion=descripcion,estado=estado)

    return jsonify(generar_respuesta( resultado["status"], resultado["mensaje"],resultado["data"]))

@resultado_aprendizaje_blueprint.route('/traer_resultados', methods=['GET'])
def traer_resultados():
    return traer_todos_resultados()
    
    
    

 