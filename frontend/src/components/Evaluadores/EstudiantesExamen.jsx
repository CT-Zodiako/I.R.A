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
          notas: [],
          observaciones: [],
        },
      },
    ],
    examen_id: '',
    evaluador_id: ''
  });
  console.log(calificacionExamen);

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
      <form>
        <div>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={onRegresarExamen}
          >
            Regresar
          </Button>
          <TableContainer className="tablas">
            <Table>
              <TableHead className="tablaEncabezado">
                <TableRow>
                  <TableCell align="center" sx={{ width: '12%' }}>Estudiantes</TableCell>
                  <TableCell align="center" sx={{ width: '25%' }}>Actividades</TableCell>
                  <TableCell align="center" sx={{ width: '43%' }}>Calificacion</TableCell>
                  <TableCell align="center" sx={{ width: '20%' }}>Observacion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listaEstudiantes.map((estudiante, indexEstudiante) => (
                  <TableRow key={indexEstudiante} sx={{ backgroundColor: indexEstudiante % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
                    <TableCell align="center" className="bordeFilas">
                      {estudiante.NOMBRE}
                    </TableCell>
                    <TableCell className="bordeFilas" align="center">
                      {actividadesExamen.map((actividad, indexActividad) => (
                        <div
                          className="actividadesExamen"
                          style={{ backgroundColor: indexEstudiante % 2 !== 0 ? '#f5f5f5' : '#ffffff'}}
                          key={indexActividad}                          
                        >
                          {/* {actividad} */}
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis commodi accusamus nemo eveniet ab aperiam unde doloribus, deleniti magnam necessitatibus, odio perferendis quis iure ea!
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="bordeFilas">
                      {actividadesExamen.map((actividad, indexActividad) => (
                        <div
                          className="calificacionExamen"
                          style={{ backgroundColor: indexEstudiante % 2 !== 0 ? '#f5f5f5' : '#ffffff'}}
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
                    <TableCell align="center">
                      <textarea
                        cols="30"
                        rows="10"
                        className="observacionesExamen"
                        // value={calificacionExamen.observaciones[IndexEstudiante] || ""}
                        onChange={(event) =>
                          onObservacion(event, indexEstudiante)
                        }
                      />
                    </TableCell>
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
