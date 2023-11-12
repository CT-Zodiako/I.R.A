from flask import Blueprint, request, jsonify
from ...controller.examen.examen_controller import agregar_examen, cargar_archivo
from ...auth import admin_required

examen_blueprint = Blueprint('examen', __name__)


@examen_blueprint.route('/crear_examen', methods=['POST'])
# @admin_required
def crear_examen():
    data = request.json
    return agregar_examen(data)

@examen_blueprint.route('/ruta_de_carga_de_archivos', methods=['POST'])
@admin_required
def cargar_excel():
    archivo = request.files['archivo']
    return cargar_archivo(archivo)