import { useEffect, useState } from 'react';
import evaluadorService from '../../services/servicioEvaluador';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputSeleccionCalificacion } from '../seleccionCalificacion';
import { agregarCalificacion } from '../../redux/calificacionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { cambiarEstadoBoton } from '../../redux/botonAlertaSlice';

export const CalificacionExamen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const examenId = location.state.examenId;
  const nombreEstudiante = location.state.nombreEstudiante;
  const dispatch = useDispatch();

  const calificacionEstudiante = useSelector((state) => state.calificacion.calificacion);
  const calificacionEvaluado = calificacionEstudiante.find((calificacion) => calificacion.nombre === nombreEstudiante);  
  const arregloCalificacion = [calificacionEvaluado];

  const calificacionActividades = calificacionEvaluado
  ? {
      nombre: '',
      calificacion: {
        notas: calificacionEvaluado.calificacion.notas,
        observaciones: calificacionEvaluado.calificacion.observaciones,
      },
    }
  : {
      nombre: '',
      calificacion: {
        notas: [],
        observaciones: [],
      },
  };

  const [evaluado, setEvaluado] = useState(calificacionActividades);
  const[estudianteCalificacion, setEstudianteExamen] = useState([]);
  const[notasCalificacion, setNotasCalificacion] = useState([]);
  const [botonCalificar, setBotonCalificar] = useState(false); 

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

  useEffect(() => {
    const numeroNotas = evaluado.calificacion.notas.length;
    const nuemeroActividades = estudianteCalificacion.length;
    const actividadesCalificadas = numeroNotas === nuemeroActividades;
    setBotonCalificar(actividadesCalificadas);
  }, [evaluado, estudianteCalificacion]);

  const onEnviarCalificacion = (event) => {
    event.preventDefault();
      dispatch(
        agregarCalificacion({
          nombre: evaluado.nombre,
          notas: evaluado.calificacion.notas,
          observaciones: evaluado.calificacion.observaciones,
        }),
      );
      dispatch(
        cambiarEstadoBoton({
          botonAlerta: true,
        }),
      );
      navigate(`/lista-estudiantes`);
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
            <h1 className='centrar'>Calificacion Evaluacion</h1>
            <div style={{ padding: "0 10rem", textAlign: "center" }}>
              <h2 className='centrar'>Proyecto Integrador</h2>
              <label htmlFor="" className='centrar'>Aqui debe ir el proyecto integrador que se esta evvaluando en este momento al estudiantes. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste reprehenderit illum optio cum quis, sint ratione neque quaerat provident saepe vel tempore, omnis suscipit harum necessitatibus nostrum ipsum facere commodi!</label>
            </div>
          </div>
          <div>
            <h2 className='centrar'>Estudiante: {nombreEstudiante} </h2>
            <div>
            <TableContainer className="tablas">
              <Table>
                <TableHead className="tablaEncabezado">
                  <TableRow>
                    <TableCell align='center'>Actividad</TableCell>
                    <TableCell align='center'>Calificacion</TableCell>
                    <TableCell align='center'>Observacion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {estudianteCalificacion.map((calificar, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ width: "35%" }}>
                        {calificar}
                      </TableCell>
                      <TableCell align='center' sx={{ width: "30%" }}>
                        <InputSeleccionCalificacion 
                          seleccionar={notasCalificacion} 
                          idSeleccion={(idSeleccion) => onNotaCalificacion(idSeleccion, index)}
                          valor={evaluado.calificacion.notas[index] }  
                        />
                      </TableCell>
                      <TableCell align='center' sx={{ width: "30%" }}>
                        <textarea 
                          cols="30" 
                          rows="10" 
                          value={evaluado.calificacion.observaciones[index] || ''}                          
                          onChange={onObservacion} 
                          data-index={index}
                          style={{ resize: "none", borderRadius: "5px"}}
                        >
                        </textarea>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
            </div>
          </div>
        </div>
        <Button
          variant='contained'
          type="submit" 
          onClick={onEnviarCalificacion}
          disabled={!botonCalificar}
        >
          Guardar
        </Button>
      </form>
    </>
  );
};
