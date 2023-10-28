import React, { useState } from 'react';
import evaluadorService from '../services/servicioEvaluador';

export const CrearEvaluador = () => {
  const [formulario, setFormulario] = useState({
    nombre_evaluador: '',
    correo: '',
    numero_identificacion: '',
    contrasenna: '',
    telefono: '',
  });

  const onAgregarEvaluador = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const onEnviarEvaluador = async (event) => {
    event.preventDefault();
    try {
      const response = await evaluadorService.agregarEvaluador(formulario);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Crear Evaluador</h1>
      <form onSubmit={onEnviarEvaluador}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre_evaluador"
            value={formulario.nombre_evaluador}
            onChange={onAgregarEvaluador}
            required
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="text"
            name="correo"
            value={formulario.correo}
            onChange={onAgregarEvaluador}
            required
          />
        </div>
        <div>
          <label>Numero identificacion:</label>
          <input
            type="text"
            name="numero_identificacion"
            value={formulario.numero_identificacion}
            onChange={onAgregarEvaluador}
            required
          />
        </div>
        <div>
          <label>Contrseña:</label>
          <input
            type="text"
            name="contrasenna"
            value={formulario.contrasenna}
            onChange={onAgregarEvaluador}
            required
          />
        </div>
        <div>
          <label>Telefono:</label>
          <input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={onAgregarEvaluador}
            required
          />
        </div>
        <div>
          <button type="submit">Crear Evaluador</button>
        </div>
      </form>
    </div>
  );
}

