from flask import Blueprint, request, jsonify
from ...controller.programa.programa_controller import traer_programas_db 



programa_blueprint = Blueprint('programa', __name__)



@programa_blueprint.route('/', methods=['GET'])
def traer_programas():
    resultados = traer_programas_db()
    return  jsonify(resultados)









    

