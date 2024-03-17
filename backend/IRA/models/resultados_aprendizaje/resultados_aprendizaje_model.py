from ...db import db

class ResultadoAprendizaje(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)
    estado = db.Column(db.Boolean, default=True)
    programa_id = db.Column(db.Integer, db.ForeignKey('programa.id'), nullable=False)
    programa = db.relationship('Programa', backref=db.backref('resultados_aprendizaje', lazy=True))
    examenes = db.relationship('Examen', backref='resultado_aprendizaje', lazy='dynamic')

    def __init__(self, titulo, descripcion, programa_id):
        self.titulo = titulo
        self.descripcion = descripcion
        self.programa_id = programa_id