from ...db import db
from ...models.relaciones.relacion_examen_evaluador import examen_evaluador_tabla


class Evaluador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_evaluador = db.Column(db.String(255), nullable=False)
    correo = db.Column(db.String(255), nullable=False)
    numero_identificacion = db.Column(db.String(255), nullable=False)
    rol = db.Column(db.String(255), nullable=False)
    contrasenna = db.Column(db.String(255), nullable=False)
    telefono = db.Column(db.String(255), nullable=False)
    estado = db.Column(db.Boolean, default=True)
    examenes_evaluador_relacion = db.relationship(
        'Examen', secondary=examen_evaluador_tabla, back_populates='evaluadores_relacion')

    def __init__(self, nombre_evaluador, correo, numero_identificacion, rol, contrasenna, telefono, estado=True):
        self.nombre_evaluador = nombre_evaluador
        self.correo = correo
        self.numero_identificacion = numero_identificacion
        self.rol = rol
        self.contrasenna = contrasenna
        self.telefono = telefono
        self.estado = estado

