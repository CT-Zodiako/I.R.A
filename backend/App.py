import os
from flask import Flask
from flask_cors import CORS
from db import db
from ma import ma
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)

# Configurar la base de datos 
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.secret_key = os.environ.get('SECRET_KEY')

# Configurar CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Configurar la ubicación de carga de archivos temporales
app.config['UPLOAD_FOLDER'] = 'uploads'

# Inicializar la base de datos y Marshmallow
db.init_app(app)
ma.init_app(app)

# Importar el objeto Blueprint y registrar la ruta en la aplicación
from routes.evaluador.evaluador import evaluador_blueprint
from routes.examen.exament_route import examen_blueprint
from routes.resultado_aprendizaje.resultado_aprendizaje_route import resultado_aprendizaje_blueprint

# Registrar las rutas en la aplicación
app.register_blueprint(evaluador_blueprint, url_prefix='/evaluador')
app.register_blueprint(examen_blueprint, url_prefix='/examen')
app.register_blueprint(resultado_aprendizaje_blueprint, url_prefix='/resultado_aprendizaje')

# Crear la carpeta de carga de archivos si no existe
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=3001, debug=True)
