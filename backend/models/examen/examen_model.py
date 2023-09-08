from db import db
from models.relaciones.relacion_examen_evaluador import examen_evaluador_association
class Examen(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    programa = db.Column(db.String(255), nullable=False)
    proyecto_integrador = db.Column(db.String(255), nullable=False)
    evaluadores = db.Column(db.JSON) 
    actividades_formativas = db.Column(db.JSON)
    estudiantes = db.Column(db.JSON)
    resultado_aprendizaje_id = db.Column(db.Integer, db.ForeignKey('resultado_aprendizaje.id'))
    evaluadores_relacion = db.relationship(
    'Evaluador',
    secondary=examen_evaluador_association,
    backref='examenes_asociados'
)
    
    
    def __init__(self, programa, proyecto_integrador, evaluadores, actividades_formativas, estudiantes, resultado_aprendizaje_id):
        self.programa = programa
        self.proyecto_integrador = proyecto_integrador
        self.evaluadores = evaluadores
        self.actividades_formativas = actividades_formativas
        self.estudiantes = estudiantes
        self.resultado_aprendizaje_id = resultado_aprendizaje_id
