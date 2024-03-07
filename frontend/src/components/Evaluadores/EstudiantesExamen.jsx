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
  const [estadoVentanaConfirmacion, setEstadoVentanaConfirmacion] =
    useState(false);
  const [botonEnvio, setBotonEnvio] = useState(false)
  const [calificacionExamen, setCalificacionExamen] = useState({
    calificacion: [
      {
        nombre: "",
        calificacion: {
          notas: [],
          observaciones: "",
        },
      },
    ],
    examen_id: "",
    evaluador_id: "",
  });

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
  console.log("numero de notas: ",totalNotas);
  const actividadesPorCalificar =
    calificacionExamen.calificacion.length * actividadesExamen.length;
  console.log("numero de actividades: ",actividadesPorCalificar);

  const abrirVentanaConfirmacion = () => {
    setEstadoVentanaConfirmacion(true);
  };

  const cerrarVentanaConfirmacion = () => {
    setEstadoVentanaConfirmacion(false);
  };

  const onRegresarExamen = () => {
    dispatch(LimpiarCalificacion()), navigate(`/lista_examenes`);
  };

  useEffect(() => {
    setCalificacionExamen((prevCalificacionExamen) => ({
      ...prevCalificacionExamen,
      examen_id: examenId,
      evaluador_id: evaluadorId,
    }));
  }, [examenId, evaluadorId]);

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
        setCalificacionExamen({ calificacion: initialCalificaciones });
      } catch (error) {
        console.error("Error al obtener los datos del estudiante", error);
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
        console.error("Error al obtener los datos de calificaciones", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const botonEnvio = totalNotas === actividadesPorCalificar;
    setBotonEnvio(botonEnvio);
    console.log("se ha calificado el examen por completo: ", botonEnvio);
  }, [totalNotas, actividadesPorCalificar]);

  const onEnviarCalificaciones = async (event) => {
    event.preventDefault();
    try {
      const response = await evaluadorService.calificacionActividadEstudiante(
        calificacionExamen
      );
      console.log("calificacion enviada: ", response);
      console.log(response);
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
                  <TableCell align="center">Estudiantes</TableCell>
                  <TableCell align="center">Actividades</TableCell>
                  <TableCell align="center">Calificacion</TableCell>
                  <TableCell align="center">Observacion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listaEstudiantes.map((estudiante, indexEstudiante) => (
                  <TableRow key={indexEstudiante}>
                    <TableCell align="center">{estudiante.NOMBRE}</TableCell>
                    <TableCell>
                      {actividadesExamen.map((actividad, indexActividad) => (
                        <div
                          style={{
                            textAlign: "center",
                            margin: "7px 0px",
                            background: "rgba(0, 0, 0, 0.1)",
                            width: "8rem",
                            height: "5rem",
                            padding: "5px",
                            borderRadius: "3px",
                          }}
                          key={indexActividad}
                        >
                          {actividad}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {actividadesExamen.map((actividad, indexActividad) => (
                        <div
                          style={{
                            height: "5rem",
                            background: "rgba(0, 0, 100, 0.1)",
                            margin: "7px 0px",
                            padding: "5px",
                            borderRadius: "3px",
                          }}
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
                    <TableCell align="center" sx={{ display: "flex" }}>
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        style={{ width: "10rem", resize: "none" }}
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
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "2 rem 5rem",
          }}
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
