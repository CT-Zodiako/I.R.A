from flask import Blueprint, request, jsonify
from ...controller.evaluador.evaluador_controller import agregar_evaluador, traer_evaluadores_db, traer_evaluadores_examen_db, eliminar_evaluador_sf, traer_evaluador_por_id,actualizar_evaluador_db,traer_estudiantes_examen_db
from flask_jwt_extended import jwt_required
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()  # Verificar que el token JWT esté presente
        current_user = get_jwt_identity()  # Obtener los datos del usuario del token
        if current_user['rol'] == 'Admin':
            return fn(*args, **kwargs)
        else:
            return jsonify({"message": "Acceso no autorizado"}), 403  # 403 significa acceso prohibido
    return wrapper

def evaluador_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()  # Verificar que el token JWT esté presente
        current_user = get_jwt_identity()  # Obtener los datos del usuario del token
        if current_user['rol'] == 'Evaluador':
            return fn(*args, **kwargs)
        else:
            return jsonify({"message": "Acceso no autorizado"}), 403  # 403 significa acceso prohibido
    return wrapper  

evaluador_blueprint = Blueprint('evaluador', __name__)


@evaluador_blueprint.route('/agregar_evaluador', methods=['POST'])
@admin_required
def crear_evaluador():
    data = request.json
    return agregar_evaluador(data)


@evaluador_blueprint.route('/traer_evaluadores', methods=['GET'])
@evaluador_required
def traer_evaluadores():
    return traer_evaluadores_db()


@evaluador_blueprint.route('/examenes_evaluador/<int:evaluador_id>', methods=['GET'])
def obtener_examenes_por_evaluador(evaluador_id):
    return traer_evaluadores_examen_db(evaluador_id)

@evaluador_blueprint.route('/estudiantes_examen/<int:examen_id>', methods=['GET'])
def obtener_estudiantes_por_examen(examen_id):
    return traer_estudiantes_examen_db(examen_id)


@evaluador_blueprint.route('/eliminar_evaluador/<int:evaluador_id>', methods=['DELETE'])
def eliminar_evaluador(evaluador_id):
    return eliminar_evaluador_sf(evaluador_id)

@evaluador_blueprint.route('/evaluador_id/<int:evaluador_id>', methods=['GET'])
def evaluador_por_id(evaluador_id):
    return traer_evaluador_por_id(evaluador_id)



@evaluador_blueprint.route('/actualizar/<int:evaluador_id>', methods=['PUT'])
def actualizar_evaluador(evaluador_id):
    data = request.json
    return actualizar_evaluador_db(data,evaluador_id)