from ...configuracion_marshmallow import ma
from ...models.evaluador.evaluador_model import Evaluador
from ...models.examen.examen_model import Examen


class EvaluadorSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Evaluador
        fields = ("id", "nombre_evaluador", "correo", "numero_identificacion","telefono","estado")
        load_instance = True

class EvaluadorConrasenaSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Evaluador
        fields = ("numero_identificacion","contrasenna","nombre_evaluador")
        load_instance = True

class ExamenEvaluadorSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Examen
        fields = ("id", "programa", "proyecto_integrador")
        load_instance = True
