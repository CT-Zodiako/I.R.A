import os
from flask import Flask
from flask_cors import CORS
from .db import db
from .configuracion_marshmallow import ma
from dotenv import load_dotenv


def create_app(test_config=None):

    

    load_dotenv()

    app = Flask(__name__, instance_relative_config=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.secret_key = os.environ.get('SECRET_KEY')

    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    app.config['UPLOAD_FOLDER'] = 'uploads'
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    db.init_app(app)
    ma.init_app(app)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from .routes.evaluador.evaluador import evaluador_blueprint
    from .routes.examen.exament_route import examen_blueprint
    from .routes.resultado_aprendizaje.resultado_aprendizaje_route import resultado_aprendizaje_blueprint

    app.register_blueprint(evaluador_blueprint, url_prefix='/evaluador')
    app.register_blueprint(examen_blueprint, url_prefix='/examen')
    app.register_blueprint(resultado_aprendizaje_blueprint,
                           url_prefix='/resultado_aprendizaje')

    with app.app_context():
        db.create_all()

    return app