from ma import ma
from models.evaluador.evaluador_model import Evaluador


class EvaluadorSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Evaluador
        fields = ("id", "nombre_evaluador", "correo")
        load_instance = True
