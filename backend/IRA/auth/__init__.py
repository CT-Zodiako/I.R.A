from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from flask import jsonify
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

jwt = JWTManager()
bcrypt = Bcrypt()


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