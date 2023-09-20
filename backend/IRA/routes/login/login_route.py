from flask import Blueprint, request, jsonify
from ...controller.login.login_controller import verificar_conectar

login_blueprint = Blueprint('login', __name__)


@login_blueprint.route('/conectar', methods=['POST'])
def verificar_login():
    usuario = request.form['usuario']
    contrasena = request.form['contrasena']
    return verificar_conectar(usuario, contrasena)
    
    
        
    
