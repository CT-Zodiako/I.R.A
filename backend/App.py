from routes.evaluador.evaluador import evaluador_blueprint
from flask import Flask
from db import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Leahtovar2017.@localhost/I.R.A'
app.secret_key = 'mysecretkey'

db.init_app(app)

# Importar el objeto Blueprint y registrar la ruta en la aplicación


# Registrar las rutas en la aplicación
app.register_blueprint(evaluador_blueprint, url_prefix='/evaluador')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=3001, debug=True)
