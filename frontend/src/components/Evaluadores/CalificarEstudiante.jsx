import { useEffect, useState } from 'react';
import evaluadorService from '../../services/servicioEvaluador';
import { useLocation, useParams } from 'react-router-dom';
import { InputSeleccionCalificacion } from '../seleccionCalificacion';
import { agregarCalificacion } from '../../redux/calificacionSlice';
import { useDispatch, useSelector } from 'react-redux';

export const CalificacionExamen = () => {
  const location = useLocation();
  const examenId = location.state.examenId;
  const nombreEstudiante = location.state.nombreEstudiante;
  const dispatch = useDispatch();

  const calificacionEstudiante = useSelector((state) => state.calificacion.calificacion);
  console.log("calificacion estudiantes del examen: ", calificacionEstudiante);
  const calificacionEvaluado = calificacionEstudiante.find((calificacion) => calificacion.nombre === nombreEstudiante);  
  const arregloCalificacion = [calificacionEvaluado];
  console.log("calificacion evaluado: ", calificacionEvaluado);
  const [evaluado, setEvaluado] = useState(() => {
    if (calificacionEvaluado) {
      return {
        nombre: '',
        calificacion: {
          notas: calificacionEvaluado.calificacion.notas,
          observaciones: calificacionEvaluado.calificacion.observaciones,
        },
      };
    } else {
      return {
        nombre: '',
        calificacion: {
          notas: [],
          observaciones: [],
        },
      };
    }
  });
  
  console.log("estudiante evaluado: ", evaluado);
  const[estudianteCalificacion, setEstudianteExamen] = useState([]);
  const[notasCalificacion, setNotasCalificacion] = useState([]);

  const onNotaCalificacion = (idSeleccion, index) => {
    setEvaluado((prevEvaluado) => {
      const newNotas = [...prevEvaluado.calificacion.notas];
      newNotas[index] = idSeleccion;
      return {
        ...prevEvaluado,
        calificacion: {
          ...prevEvaluado.calificacion,
          notas: newNotas,
        },
      };
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

  // const onNotaCalificacion = (idSeleccion) => {
  //   setEvaluado({
  //     ...evaluado,
  //       calificacion: {
  //         ...evaluado.calificacion,
  //         notas: [...evaluado.calificacion.notas, idSeleccion],
  //     },
  //   });
  // };

  // const onObservacion = (event) => {
  //   const guardarObservacion = event.target.value;
  //   const index = Number(event.target.dataset.index);
  //   setEvaluado((prevEvaluado) => {
  //     const newObservaciones = [...prevEvaluado.calificacion.observaciones];
  //     newObservaciones[index] = guardarObservacion;
  //     return {
  //       ...prevEvaluado,
  //       calificacion: {
  //         ...prevEvaluado.calificacion,
  //         observaciones: newObservaciones,
  //       },
  //     };
  //   });
  // };

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
                      <td>{calificar}</td>
                      <td>
                        <InputSeleccionCalificacion 
                          seleccionar={notasCalificacion} 
                          idSeleccion={(idSeleccion) => onNotaCalificacion(idSeleccion, index)}
                          valor={evaluado.calificacion.notas[index] || ''}                        
                        />
                      </td>
                      <td>
                        <textarea 
                          name="" 
                          id="" 
                          cols="30" 
                          rows="10" 
                          value={evaluado.calificacion.observaciones[index] || ''}                          
                          onChange={onObservacion} 
                          data-index={index}
                          >

                        </textarea>
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
