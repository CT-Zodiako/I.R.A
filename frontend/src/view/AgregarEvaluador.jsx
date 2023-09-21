import React, { useEffect, useState } from 'react';
import evaluadorService from '../services/servicioEvaluador';

export const CrearEvaluador = () => {
  const [formulario, setFormulario] = useState({
    nombre_evaluador: '',
    correo: '',
    numero_identificacion: '',
    contrasenna: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await evaluadorService.buscarEvaluador();
        setFormulario(data);
      } catch (error) {
        console.error('Error al obtener el resultado:', error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formularioExamen);
    try {
      await  evaluadorService.editarEvaluador(formularioExamen);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
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
          <input
            type="text"
            name="nombre_evaluador"
            value={formulario.nombre_evaluador}
            onChange={handleChange}
            required
          />
        </div>
        <div>
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
        </div>
        <div>
          <button type="submit">Crear Evaluador</button>
          <button></button>
        </div>
      </form>
    </div>
  );
}

