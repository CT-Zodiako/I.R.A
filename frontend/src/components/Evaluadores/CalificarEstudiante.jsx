import { useEffect, useState } from 'react';
import evaluadorService from '../../services/servicioEvaluador';
import { useParams } from 'react-router-dom';
import { InputSeleccionCalificacion } from '../seleccionCalificacion';
import { agregarCalificacion } from '../../redux/calificacionSlice';
import { useDispatch } from 'react-redux';

export const CalificacionExamen = () => {
  const dispatch = useDispatch();
  const[evaluado, setEvaluado] = useState({
        nombre: '',
        calificacion:{
          notas:[],
          observaciones:[]
        }
  });

  const[estudianteCalificacion, setEstudianteExamen] = useState([]);
  const[notasCalificacion, setNotasCalificacion] = useState([]);

  const { nombreEstudiante, examenId } = useParams();

  const onNotaCalificacion = (idSeleccion) => {
    setEvaluado({
      ...evaluado,
        calificacion: {
          ...evaluado.calificacion,
          notas: [...evaluado.calificacion.notas, idSeleccion],
      },
    });
  };

  const onObservacion = (event) => {
    const guardarObservacion = event.target.value;
    const index = Number(event.target.dataset.index);
    setEvaluado((prevEvaluado) => {
      const newObservaciones = [...prevEvaluado.calificacion.observaciones];
      newObservaciones[index] = guardarObservacion;
      return {
        ...prevEvaluado,
        calificacion: {
          ...prevEvaluado.calificacion,
          observaciones: newObservaciones,
        },
      };
    });
  };

  const onEnviarCalificacion = (event) => {
    event.preventDefault();
    dispatch(
      agregarCalificacion({
          examenId: examenId,
          nombre: evaluado.nombre,
          notas: evaluado.calificacion.notas,
          observaciones: evaluado.calificacion.observaciones,
      })
    );
    console.log(evaluado);
  };

  useEffect(() => {
    setEvaluado({
      ...evaluado,
      nombre: nombreEstudiante,
    });
  }, [nombreEstudiante]);

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
        console.log(data);
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
                        <InputSeleccionCalificacion seleccionar={notasCalificacion} idSeleccion={onNotaCalificacion} />
                      </td>
                      <td>
                        <textarea name="" id="" cols="30" rows="10" onChange={onObservacion} data-index={index}></textarea>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button type="submit" onClick={onEnviarCalificacion}>Calificar Estudiante</button>
      </form>
    </>
  );
};
