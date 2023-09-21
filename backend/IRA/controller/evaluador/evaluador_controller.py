from ...db import db
from flask import jsonify
from ...models.evaluador.evaluador_model import Evaluador
from ...models.evaluador.schemas import EvaluadorSchema, ExamenEvaluadorSchema
from sqlalchemy.exc import IntegrityError
from ...models.relaciones.relacion_examen_evaluador import examen_evaluador_tabla


def agregar_evaluador(data):
    try:
        nombre_evaluador = data.get('nombre_evaluador')
        correo = data.get('correo')
        numero_identificacion = data.get('numero_identificacion')
        contrasenna = data.get('contrasenna')
        telefono = data.get('telefono')

        if not (nombre_evaluador and correo and numero_identificacion and contrasenna and telefono):
            return jsonify({'mensaje': 'Todos los campos son obligatorios.', 'status': 400}), 400

        if Evaluador.query.filter_by(correo=correo).first():
            db.session.rollback()
            return jsonify({'mensaje': 'El correo ya está en uso.', 'status': 400}), 400
        
        if Evaluador.query.filter_by(numero_identificacion=numero_identificacion).first():
            db.session.rollback()
            return jsonify({'mensaje': 'El usuario ya está en uso.', 'status': 400}), 400

        nuevo_evaluador = Evaluador(nombre_evaluador=nombre_evaluador, correo=correo,
                                    numero_identificacion=numero_identificacion, contrasenna=contrasenna, telefono=telefono)

        db.session.add(nuevo_evaluador)
        db.session.commit()

        return jsonify({'mensaje': 'Evaluador creado con éxito', 'status': 201}), 201

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'mensaje': 'Error de integridad de la base de datos.', 'status': 500}), 500

    except Exception as e:
        return jsonify({'mensaje': 'Fallo al crear el evaluador', 'status': 500}), 500


def traer_evaluadores_db():
    try:
        sEvaluador = EvaluadorSchema(many=True)
        evaluadores = Evaluador.query.all()
        data = sEvaluador.dump(evaluadores)

        return jsonify({'mensaje': 'Evaluadores obtenidos con éxito', 'data': data, 'status': 200}), 200

    except Exception as e:
        return jsonify({'mensaje': 'Fallo al obtener evaluadores', 'error': str(e), 'status': 500}), 500


def traer_evaluadores_examen_db(evaluador_id):
    try:
        sExamenEvaluador = ExamenEvaluadorSchema(many=True)
        examenEvaluador = Evaluador.query.get(evaluador_id)

        if examenEvaluador is None:
            return jsonify({'message': 'Evaluador no encontrado'}), 404

        examenes = examenEvaluador.examenes_evaluador_relacion
        data = sExamenEvaluador.dump(examenes)

        return jsonify({'mensaje': 'Examenes del evaluador con exito', 'data': data}), 200

    except Exception as e:
        return jsonify({'message': 'Error al obtener los examenes del evaluador', 'error': str(e)}), 500



def eliminar_evaluador_sf(evaluador_id):
    try:
        evaluador = Evaluador.query.get_or_404(evaluador_id)
    
        evaluaciones_relacionadas = db.session.query(examen_evaluador_tabla).filter_by(evaluador_id=evaluador_id).count()
        if evaluaciones_relacionadas > 0:
            evaluador.estado = False 
            db.session.commit()
            return jsonify({'mensaje': 'El evaluador se ha desactivado debido a las evaluaciones relacionadas', 'status': 200}), 200

        db.session.delete(evaluador)
        db.session.commit()

        return jsonify({'mensaje': 'Evaluador eliminado con éxito', 'status': 200}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'mensaje': 'Fallo al eliminar evaluador', 'error': str(e), 'status': 500}), 500
  