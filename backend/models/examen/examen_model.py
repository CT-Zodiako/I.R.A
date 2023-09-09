from db import db
from models.relaciones.relacion_examen_evaluador import examen_evaluador_association
class Examen(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    programa = db.Column(db.String(255), nullable=False)
    proyecto_integrador = db.Column(db.String(255), nullable=False)
    actividades_formativas = db.Column(db.JSON)
    estudiantes = db.Column(db.JSON)
    resultado_aprendizaje_id = db.Column(db.Integer, db.ForeignKey('resultado_aprendizaje.id'))
    evaluadores_relacion = db.relationship(
        'Evaluador',
        secondary=examen_evaluador_association,
        back_populates='examenes_evaluador_relacion')
    
    def __init__(self, programa, proyecto_integrador, actividades_formativas, estudiantes, resultado_aprendizaje_id):
        self.programa = programa
        self.proyecto_integrador = proyecto_integrador
        self.actividades_formativas = actividades_formativas
        self.estudiantes = estudiantes
        self.resultado_aprendizaje_id = resultado_aprendizaje_id
        
    def to_dict(self):
        return {
            'id': self.id,
            'programa': self.programa,
            'proyecto_integrador': self.proyecto_integrador,
            
        }
