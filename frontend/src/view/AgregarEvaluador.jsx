import React, { useState } from 'react';
import evaluadorService from '../services/servicioEvaluador';
import { InputGeneral } from '../components/InputFormulario';

export const CrearEvaluador = () => {
  const [formulario, setFormulario] = useState({
    nombre_evaluador: '',
    correo: '',
    numero_identificacion: '',
    rol: '',
    contrasenna: '',
    telefono: '',
  });

  const handleChange = (name, value) => {
    // const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const onEnviarEvaluador = async (e) => {
    e.preventDefault();
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
          <InputGeneral 
            key='nombre_evaluador' 
            name='nombre_evaluador' 
            value={formulario.nombre_evaluador}  
            onChange={handleChange}
          />
          {/* <input
            type="text"
            name="nombre_evaluador"
            value={formulario.nombre_evaluador}
            onChange={handleChange}
            required
          /> */}
        </div>
        {/* <div>
          <label>Correo:</label>
          <input
            type="text"
            name="correo"
            value={formulario.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Numero identificacion:</label>
          <input
            type="text"
            name="numero_identificacion"
            value={formulario.numero_identificacion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rol:</label>
          <input
            type="text"
            name="rol"
            value={formulario.rol}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contrseña:</label>
          <input
            type="text"
            name="contrasenna"
            value={formulario.contrasenna}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefono:</label>
          <input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={handleChange}
            required
          />
        </div> */}
        <div>
          <button type="submit">Crear Evaluador</button>
        </div>
      </form>
    </div>
  );
}

