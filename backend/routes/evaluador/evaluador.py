from flask import Blueprint, request, jsonify
from controller.evaluador.evaluador_controller import agregar_evaluador, traer_evaluadores_db
from helpers.generar_respuesta_helper import generar_respuesta
from models.evaluador.evaluador_model import Evaluador
from models.evaluador.schemas import EvaluadorSchema, ExamenEvaluadorSchema

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


@evaluador_blueprint.route('/examen-evaluador/<int:evaluador_id>', methods=['GET'])
def obtener_examenes_por_evaluador(evaluador_id):
    try:
        sExamenEvaluador = ExamenEvaluadorSchema(many=True)
        examenEvaluador = Evaluador.query.get(evaluador_id)

        if sExamenEvaluador is None:
            return jsonify({'message': 'Evaluador no encontrado'}), 404

        examenes = examenEvaluador.examenes_evaluador_relacion
        print(f"Examenes: {examenes[2].proyecto_integrador}")
        data = sExamenEvaluador.dump(examenes)

       
        

        return {
            'status': 200,
            'mensaje' : 'Lista evaluadores obtenidos exitosamente',
            'data': data
        }

    except Exception as e:
        return jsonify({'message': 'Error al obtener los exámenes por evaluador', 'error': str(e)}), 500

