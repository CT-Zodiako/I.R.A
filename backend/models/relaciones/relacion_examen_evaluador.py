from db import db

examen_evaluador_association = db.Table(
    'examen_evaluador_association',
    db.Column('examen_id', db.Integer, db.ForeignKey('examen.id')),
    db.Column('evaluador_id', db.Integer, db.ForeignKey('evaluador.id'))
)
