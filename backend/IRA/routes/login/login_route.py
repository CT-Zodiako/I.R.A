from flask import Blueprint, request, jsonify
from ...controller.login.login_controller import verificar_conectar

login_blueprint = Blueprint('login', __name__)


@login_blueprint.route('/conectar', methods=['POST'])
def verificar_login():
    data = request.json
    usuario = data.get('usuario')
    contrasena = data.get('contrasena')
    return verificar_conectar(usuario, contrasena)
