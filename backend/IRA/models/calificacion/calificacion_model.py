from ...db import db
from ...models.examen.examen_model import Examen

class CalificacionExamen(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calificacion = db.Column(db.JSON)
    examen_id = db.Column(db.Integer, db.ForeignKey(Examen.id), unique=True, nullable=False)
    examen = db.relationship('Examen', backref='calificacion', uselist=False)

    def __init__(self, calificacion,examen_id):
        self.calificacion = calificacion
        self.examen_id = examen_id
