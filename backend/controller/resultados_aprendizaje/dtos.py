
def resultado_aprendizaje_dto(resultado):
    return {
        'id': resultado.id,
        'titulo': resultado.titulo,
        'descripcion': resultado.descripcion,
        'estado': resultado.estado
    }
