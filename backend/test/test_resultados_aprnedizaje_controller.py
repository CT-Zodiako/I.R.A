# test_tu_modulo.py

from flask import jsonify
from IRA.models.evaluador.evaluador_model import Evaluador
from IRA.models.evaluador.schemas import EvaluadorSchema, ExamenEvaluadorSchema
from sqlalchemy.exc import IntegrityError

def test_agregar_evaluador(client, mocker):
    # Simula la base de datos y el comportamiento de la función
    mocker.patch('IRA.models.evaluador.evaluador_model.db.session.add')
    mocker.patch('IRA.models.evaluador.evaluador_model.db.session.commit')
    
    # Simula la creación de una instancia de Evaluador
    mock_evaluador = mocker.Mock()
    mocker.patch('IRA.models.evaluador.evaluador_model.Evaluador', return_value=mock_evaluador)
    
    # Datos de ejemplo para la prueba
    data = {
        'nombre_evaluador': 'John Doe',
        'correo': 'john@example.com',
        'numero_identificacion': '12345',
        'rol': 'evaluador',
        'contrasenna': 'password',
        'telefono': '555-123-4567',
    }

    # Realiza una solicitud POST simulada a la función
    response = client.post('/ruta_de_prueba', json=data)

    # Verifica que la función haya sido llamada con los datos correctos
    mock_evaluador.assert_called_once_with(
        nombre_evaluador='John Doe',
        correo='john@example.com',
        numero_identificacion='12345',
        rol='evaluador',
        contrasenna='password',
        telefono='555-123-4567',
    )
    
    # Verifica la respuesta HTTP y el contenido
    assert response.status_code == 201
    assert response.get_json() == {'mensaje': 'Evaluador creado con éxito', 'status': 201}
