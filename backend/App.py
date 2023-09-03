import os
from routes.evaluador.evaluador import evaluador_blueprint
from flask import Flask
from flask_cors import CORS
from db import db
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)

# Configurar la base de datos 
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.secret_key = os.environ.get('SECRET_KEY')

# Configurar CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
db.init_app(app)

# Importar el objeto Blueprint y registrar la ruta en la aplicación


# Registrar las rutas en la aplicación
app.register_blueprint(evaluador_blueprint, url_prefix='/evaluador')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=3001, debug=True)
