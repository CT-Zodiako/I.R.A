from db import db

class Examen(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    programa = db.Column(db.String(255), nullable=False)
    proyecto_integrador = db.Column(db.String(255), nullable=False)
    evaluadores = db.Column(db.JSON) 
    actividades_formativas = db.Column(db.JSON)
    estudiantes = db.Column(db.JSON)
