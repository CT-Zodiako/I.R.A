from db import db
from model import Evaluador

def agregar_evaluador(nombre_evaluador, correo, numero_identifiacion, rol, contrasenna, telefono):    
    nuevo_evaluador = Evaluador(nombre_evaluador=nombre_evaluador, correo=correo,
                                numero_identifiacion=numero_identifiacion, rol=rol, contrasenna=contrasenna, telefono=telefono)

    db.session.add(nuevo_evaluador)
    db.session.commit()

    # Devuelve un diccionario JSON con un mensaje y los detalles del evaluador agregado
    return "agregado en el servie"

