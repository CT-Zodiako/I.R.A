from db import db

class ResultadoAprendizaje(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)
    estado = db.Column(db.String(255), nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'descripcion': self.descripcion,
            'estado': self.estado
            # Agrega otros campos si los tienes
        }
