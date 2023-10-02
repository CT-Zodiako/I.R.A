from ...db import db
from ...models.relaciones.relacion_examen_evaluador import examen_evaluador_tabla
from ...models.programa.programas_model import Programa


class Examen(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    programa_id = db.Column(db.Integer, db.ForeignKey(Programa.id), nullable=False)
    # programa_id = db.Column(db.Integer, db.ForeignKey('programa.id'), nullable=False)
    proyecto_integrador = db.Column(db.String(255), nullable=False)
    actividades_formativas = db.Column(db.JSON)
    estudiantes = db.Column(db.JSON)
    resultado_aprendizaje_id = db.Column(
        db.Integer, db.ForeignKey('resultado_aprendizaje.id'))
    evaluadores_relacion = db.relationship(
        'Evaluador', secondary=examen_evaluador_tabla, back_populates='examenes_evaluador_relacion')

    def __init__(self, programa_id, proyecto_integrador, actividades_formativas, estudiantes, resultado_aprendizaje_id):
        self.programa_id = programa_id
        self.proyecto_integrador = proyecto_integrador
        self.actividades_formativas = actividades_formativas
        self.estudiantes = estudiantes
        self.resultado_aprendizaje_id = resultado_aprendizaje_id
