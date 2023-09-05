from ma import ma
from models.resultados_aprendizaje.resultados_aprendizaje_model import ResultadoAprendizaje

class ResultadoAprendizajeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ResultadoAprendizaje
        load_instance = True


