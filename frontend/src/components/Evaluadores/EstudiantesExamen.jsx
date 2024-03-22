import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LimpiarCalificacion } from "../../redux/calificacionSlice";
import { SeleccionCalificacion } from "./SeleccionCalificacion";
import evaluadorService from "../../services/servicioEvaluador";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ConfirmarEnvioExamen } from "./ConfirmarEnvioExamen";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

export const EstudiantesExamen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const examenId = useSelector((state) => state.calificacion.examen_id);
  const evaluadorId = useSelector((state) => state.sesion.id);

  const [actividadesExamen, setActividadesExamen] = useState([]);
  const [listaEstudiantes, setListaEstudiantes] = useState([]);
  const [notasCalificacion, setNotasCalificacion] = useState([]);
  const [estadoVentanaConfirmacion, setEstadoVentanaConfirmacion] = useState(false);
  const [botonEnvio, setBotonEnvio] = useState(false)
  const [calificacionExamen, setCalificacionExamen] = useState({
    calificacion: [
      {
        nombre: '',
        calificacion: {
          notas: [''],
          observaciones: [],
        },
      },
    ],
    examen_id: '',
    evaluador_id: ''
  });
  console.log("calificaciones examen: ",calificacionExamen);

  const numeroactividades = actividadesExamen.length;
  
  const onNotaCalificacion = (idSeleccion, indexEstudiante, indexActividad) => {
    setCalificacionExamen((prevCalificaciones) => {
      const nuevasCalificaciones = { ...prevCalificaciones };
      const nuevaCalificacionEstudiante = {
        ...nuevasCalificaciones.calificacion[indexEstudiante],
      };
      nuevaCalificacionEstudiante.calificacion.notas = [
        ...nuevaCalificacionEstudiante.calificacion.notas,
      ];
      nuevaCalificacionEstudiante.calificacion.notas[indexActividad] =
        idSeleccion;
      nuevasCalificaciones.calificacion[indexEstudiante] =
        nuevaCalificacionEstudiante;
      return nuevasCalificaciones;
    });
  };

  const onObservacion = (event, indexEstudiante) => {
    const guardarObservacion = event.target.value;
    setCalificacionExamen((prevCalificaciones) => {
      const nuevasCalificaciones = { ...prevCalificaciones };
      const nuevaCalificacionEstudiante = {
        ...nuevasCalificaciones.calificacion[indexEstudiante],
      };
      nuevaCalificacionEstudiante.calificacion.observaciones =
        guardarObservacion;
      nuevasCalificaciones.calificacion[indexEstudiante] =
        nuevaCalificacionEstudiante;
      return nuevasCalificaciones;
    });
  };

  const CalcularConteoTotal = (calificacionExamen) => {
    let conteoNotas = 0;
    calificacionExamen.calificacion.forEach((estudiante) => {
      estudiante.calificacion.notas.forEach((nota) => {
        if (nota) {
          conteoNotas += 1;
        }
      });
    });
    return conteoNotas;
  };
  const totalNotas = CalcularConteoTotal(calificacionExamen);
  const actividadesPorCalificar = calificacionExamen.calificacion.length * actividadesExamen.length;

  const abrirVentanaConfirmacion = () => {
    setEstadoVentanaConfirmacion(true);
  };

  const cerrarVentanaConfirmacion = () => {
    setEstadoVentanaConfirmacion(false);
  };

  const onRegresarExamen = () => {
    dispatch(
      LimpiarCalificacion()
    ), 
    navigate(`/lista_examenes`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const dataActividades = await evaluadorService.calificacionEvaluador(
          examenId
        );
        setActividadesExamen(dataActividades);

        const dataEstudiantes = await evaluadorService.estudiantesExamen(
          examenId
        );
        setListaEstudiantes(dataEstudiantes);

        const initialCalificaciones = dataEstudiantes.map((estudiante) => ({
          nombre: estudiante.NOMBRE,
          calificacion: {
            notas: new Array(dataActividades.length).fill(null),
            observaciones: "",
          },
        }));
        setCalificacionExamen({ calificacion: initialCalificaciones, examen_id: examenId, evaluador_id: evaluadorId });
      } catch (error) {
        console.error("Error al obtener los datos del estudiante", error);
      }
    }
    fetchData();
  }, [examenId, evaluadorId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await evaluadorService.calificacionEstudiante();
        setNotasCalificacion(data);
        console.log(data);
      } catch (error) {
        console.error("Error al obtener los datos de calificaciones", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const botonEnvio = totalNotas === actividadesPorCalificar;
    setBotonEnvio(botonEnvio);
  }, [totalNotas, actividadesPorCalificar]);

  const onEnviarCalificaciones = async (event) => {
    event.preventDefault();
    try {
      await evaluadorService.calificacionActividadEstudiante(
        calificacionExamen
      );
      cerrarVentanaConfirmacion();
    } catch (error) {
      console.error("Error al enviar los datos de la calificacion:", error);
    }
  };

  return (
    <>
      <div>
        <div className="cabecera">
          <h1>Calificacion de Examen</h1>
        </div>
        <div className="cuerpo">
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={onRegresarExamen}
          >
            Regresar
          </Button>
        </div>
        <form>
          <div className="tablascontenido">
            <TableContainer className="tablas" sx={{ maxHeight: '30rem', overflowY: 'auto' }}>
              <Table>
                <TableHead className="tablaEncabezado" sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
                  <TableRow>
                    <TableCell className=" bordeVerticar" align="center" sx={{ width: '12%' }}>ESTUDIANTES</TableCell>
                    <TableCell className=" bordeVerticar" align="center" sx={{ width: '22%' }}>ACTIVIDADES</TableCell>
                    <TableCell className=" bordeVerticar" align="center" sx={{ width: '40%' }}>CALIFICACION</TableCell>
                    <TableCell className=" bordeVerticar" align="center" sx={{ width: '18%' }}>OBSERVACION</TableCell>
                    <TableCell align="center">ESTADO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listaEstudiantes.map((estudiante, indexEstudiante) => (
                    <TableRow key={indexEstudiante} sx={{ backgroundColor: indexEstudiante % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
                      <TableCell align="center" className="bordeFilas bordeVerticar">
                        {estudiante.NOMBRE}
                      </TableCell>
                      <TableCell className="bordeFilas bordeVerticar" align="center">
                        {actividadesExamen.map((actividad, indexActividad) => (
                          <div
                            className="actividadesExamen"
                            style={{ backgroundColor: indexEstudiante % 2 !== 0 ? '#f5f5f5' : '#ffffff', border: '1px solid rgba(0, 0, 0, 0.5)'}}
                            key={indexActividad}                          
                          >
                            {actividad}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell className="bordeFilas bordeVerticar">
                        {actividadesExamen.map((actividad, indexActividad) => (
                          <div
                            className="calificacionExamen"
                            style={{ backgroundColor: indexEstudiante % 2 !== 0 ? '#f5f5f5' : '#ffffff', border: '1px solid rgba(0, 0, 0, 0.5)'}}
                            key={indexActividad}
                          >
                            <SeleccionCalificacion
                              seleccionar={notasCalificacion}
                              idSeleccion={(idSeleccion) =>
                                onNotaCalificacion(
                                  idSeleccion,
                                  indexEstudiante,
                                  indexActividad
                                )
                              }
                            />
                          </div>
                        ))}
                      </TableCell>
                      <TableCell className="bordeVerticar" align="center">
                        <textarea
                          cols="30"
                          rows="10"
                          className="observacionesExamen"
                          sx={{ border: '1px solid #000000' }}
                          // value={calificacionExamen.observaciones[IndexEstudiante] || ""}
                          onChange={(event) =>
                            onObservacion(event, indexEstudiante)
                          }
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ background: (() => {
                            const calificacionEstudiante = calificacionExamen.calificacion.find(calificado => calificado.nombre === estudiante.NOMBRE);
                        
                            if (calificacionEstudiante && calificacionEstudiante.calificacion && calificacionEstudiante.calificacion.notas) {
                                const notasSinNull = calificacionEstudiante.calificacion.notas.filter(nota => nota !== null);
                                return notasSinNull.length === numeroactividades ? 
                                  'rgba(0, 188, 0, 0.8)'
                                  : 
                                  'rgba(255, 0, 0, 0.8)'
                                  ;
                            } else {
                                return <p>sin calificar</p>;
                            }
                          })() }}
                        
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div
            className="enviarCalificacion"
          >
            <Button
              variant="contained"
              disabled={!botonEnvio}
              onClick={abrirVentanaConfirmacion}
            >
              Enviar Calificacion
            </Button>
          </div>
        </form>
      </div>
      <div>
        <ConfirmarEnvioExamen
          estadoConfirmacion={estadoVentanaConfirmacion}
          cerrarConfirmacion={cerrarVentanaConfirmacion}
          enviarExamenCalificado={onEnviarCalificaciones}
        />
      </div>
    </>
  );
};
