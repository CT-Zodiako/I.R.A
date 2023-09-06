from db import db
from models.resultados_aprendizaje.enum import EstadoEnum

class ResultadoAprendizaje(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)
    estado = db.Column(db.Enum(EstadoEnum), nullable=False, default=EstadoEnum.ACTIVO)
    examenes = db.relationship('Examen', backref='resultado_aprendizaje', lazy='dynamic')


    def __init__(self, titulo, descripcion, estado):
        self.titulo = titulo
        self.descripcion = descripcion
        self.estado = estado
        
    def cambiar_estado(self, nuevo_estado):
        if nuevo_estado in [estado.value for estado in EstadoEnum]:
            self.estado = nuevo_estado
