import React, { useEffect, useState } from 'react';
import evaluadorService from '../../services/servicioEvaluador';
import { useParams } from 'react-router-dom';
import { InputSeleccionCalificacion } from '../seleccionCalificacion';

export const CalificacionExamen = () => {
  const [calificaciones, setCalificaciones] = useState([]);

  const [estudianteCalificacion, setEstudianteExamen] = useState([]);
  
  const [notasCalificacion, setNotasCalificacion] = useState([]);
  const [observaciones, setObservaciones] = useState([]);

  const { nombreEstudiante, examenId } = useParams();

  const onNotaCalificacion = (index, value) => {
    const guardarCalificacion = [...calificaciones];
    guardarCalificacion[index] = { ...guardarCalificacion[index], calificacion: value };
    setCalificaciones(guardarCalificacion);
  };

  const onObservacion = (index, event) => {
    const guardarObservacion = [...observaciones];
    guardarObservacion[index] = event.target.value;
    setObservaciones(guardarObservacion);
  };

  const onEnviarCalificacion = (event) => {
    event.preventDefault();
    const data = estudianteCalificacion.map((calificar, index) => {
      return {
        calificacion: calificaciones[index].calificacion,
        observacion: observaciones[index],
      };
    });
    console.log(data);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await evaluadorService.calificacionEvaluador(examenId);
        setEstudianteExamen(data);
      } catch (error) {
        console.error('Error al obtener los datos del estudiante', error);
      }
    }
    fetchData();
  }, [examenId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await evaluadorService.calificacionEstudiante();
        setNotasCalificacion(data);
      } catch (error) {
        console.error('Error al obtener los datos de calificaciones', error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={onEnviarCalificacion}>
        <div>
          <div>
            <h1>Calificacion Evaluacion</h1>
            <h2>Proyecto Integrador</h2>
            <label htmlFor="">IoT</label>
          </div>
          <div>
            <h2>Estudiante: {nombreEstudiante} </h2>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Actividad</th>
                    <th>Calificacion</th>
                    <th>Observacion</th>
                  </tr>
                </thead>
                <tbody>
                  {estudianteCalificacion.map((calificar, index) => (
                    <tr key={index}>
                      <td>{calificar.descripcion}</td>
                      <td>
                        <InputSeleccionCalificacion seleccionar={notasCalificacion} idSeleccion={(value) => onNotaCalificacion(index, value)} />
                      </td>
                      <td>
                        <textarea name="" id="" cols="30" rows="10" onChange={(event) => onObservacion(index, event)}></textarea>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button type="submit">Calificar</button>
      </form>
    </>
  );
};
