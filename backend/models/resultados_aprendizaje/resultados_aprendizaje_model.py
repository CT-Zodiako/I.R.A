from db import db
from models.resultados_aprendizaje.enum import EstadoEnum

class ResultadoAprendizaje(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)
    estado = db.Column(db.Enum(EstadoEnum), nullable=False, default=EstadoEnum.ACTIVO)

    def __init__(self, titulo, descripcion, estado):
        self.titulo = titulo
        self.descripcion = descripcion
        self.estado = estado
