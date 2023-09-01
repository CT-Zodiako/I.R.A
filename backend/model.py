from db import db


class Evaluador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_evaluador = db.Column(db.String(255), nullable=False)
    correo = db.Column(db.String(255), nullable=False)
    numero_identifiacion = db.Column(db.String(255), nullable=False)
    rol = db.Column(db.String(255), nullable=False)
    contrasenna = db.Column(db.String(255), nullable=False)
    telefono = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Evaluador {self.id}>'
