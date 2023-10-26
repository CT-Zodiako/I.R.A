from ...models.calificacion.schema import CalificacionExamenSchema
from ...db import db
from flask import jsonify
from ...models.calificacion.calificacion_model import CalificacionExamen


def traer_calificaciones_db():
    calificaciones_examenes = CalificacionExamen.query.all()

    # Utiliza el esquema CalificacionExamenSchema para serializar los objetos CalificacionExamen
    calificaciones_schema = CalificacionExamenSchema(many=True)
    calificaciones_serializables = calificaciones_schema.dump(calificaciones_examenes)

    # Envía la respuesta JSON con todas las calificaciones
    return jsonify(calificaciones=calificaciones_serializables)


