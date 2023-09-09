from db import db
from flask import jsonify
from models.examen.examen_model import Examen
from models.evaluador.evaluador_model import Evaluador

import os
import pandas as pd


def agregar_examen(data):
    try:
        programa = data.get('programa')
        proyecto_integrador = data.get('proyecto_integrador')
        actividades_formativas = data.get('actividades_formativas')
        estudiantes = data.get('estudiantes')
        resultado_aprendizaje_id = data.get('resultado_aprendizaje_id')
        evaluadores_ids = data.get('evaluadores_ids')
        
        if not (programa and proyecto_integrador and actividades_formativas and estudiantes and resultado_aprendizaje_id and evaluadores_ids):
            return jsonify({'mensaje': 'Faltan campos obligatorios en los datos'}), 400

        examen = Examen(programa=programa, proyecto_integrador=proyecto_integrador,
                        actividades_formativas=actividades_formativas, estudiantes=estudiantes,
                        resultado_aprendizaje_id=resultado_aprendizaje_id)

        evaluadores = Evaluador.query.filter(
            Evaluador.id.in_(evaluadores_ids)).all()
        
        if len(evaluadores) != len(evaluadores_ids):
            return jsonify({'mensaje': 'Uno o más evaluadores no existen'}), 400
        
        examen.evaluadores_relacion = evaluadores

        db.session.add(examen)
        db.session.commit()

        return jsonify({'mensaje': 'Examen creado con exito'}), 201

    except Exception as e:
        return jsonify({'mensaje': 'Fallo para agregar examen', 'error': f'{e}'}), 500


def cargar_archivo(archivo):
    try:
        from App import app
        if archivo:
            # Guardar el archivo en la carpeta de carga de archivos temporales
            archivo.save(os.path.join(app.config['UPLOAD_FOLDER'], archivo.filename))

            # Leer el archivo XLSX en un DataFrame de pandas
            ruta_archivo_xlsx = os.path.join(app.config['UPLOAD_FOLDER'], archivo.filename)
            df = pd.read_excel(ruta_archivo_xlsx)

            # Convertir el DataFrame en JSON
            datos_json = df.to_json(orient='records')
            
            # Eliminar el archivo después de convertirlo
            os.remove(ruta_archivo_xlsx)
            
            print( f"datos_json {datos_json}" )

            return jsonify({'mensaje': 'Archivo cargado y convertido a JSON con éxito', 'datos': datos_json}), 200
        else:
            return jsonify({'mensaje': 'No se ha enviado un archivo'}), 400
    except Exception as e:
        print(f"Error al cargar el archivo: {str(e)}")
        return jsonify({'mensaje': 'Error al cargar el archivo', 'error': str(e)}), 500