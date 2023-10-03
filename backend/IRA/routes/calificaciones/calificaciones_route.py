from ...db import db
from flask import Blueprint, request, jsonify
from ...controller.calificacion.calificacion_controller import guardar_calificacion_db

calificaciones_blueprint = Blueprint('calificaciones', __name__)


@calificaciones_blueprint.route('/guardar_calificacion', methods=['POST'])
def guardar_calificacion():
    return guardar_calificacion_db(data=request.json)