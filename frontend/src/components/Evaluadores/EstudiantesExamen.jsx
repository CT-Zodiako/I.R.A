import { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";

export const EstudiantesExamen = () => {
  const examenId = useSelector((state) => state.calificacion.examen_id);

  const [actividadesExamen, setActividadesExamen] = useState([]);
  const [listaEstudiantes, setListaEstudiantes] = useState([]);
  const [notasCalificacion, setNotasCalificacion] = useState([]);
  const [calificacionExamen, setCalificacionExamen] = useState([
    {
        nombre: '',
        notas: [],
        observacion: '',
    }
  ]);
  console.log("lista de calificaciones: ",calificacionExamen);

  const onNotaCalificacion = (idSeleccion, indexEstudiante, indexActividad) => {
    setCalificacionExamen((prevCalificaciones) => {
      const nuevasCalificaciones = [...prevCalificaciones];
      const nuevaCalificacionEstudiante = { ...nuevasCalificaciones[indexEstudiante] };
      nuevaCalificacionEstudiante.notas = [...nuevaCalificacionEstudiante.notas];
      nuevaCalificacionEstudiante.notas[indexActividad] = idSeleccion;
      nuevasCalificaciones[indexEstudiante] = nuevaCalificacionEstudiante;
      return nuevasCalificaciones;
    });
  };

  const onObservacion = (event, indexEstudiante) => {
    const guardarObservacion = event.target.value;
    setCalificacionExamen((prevCalificaciones) => {
      const nuevasCalificaciones = [...prevCalificaciones];
      nuevasCalificaciones[indexEstudiante] = {
        ...prevCalificaciones[indexEstudiante],
        observacion: guardarObservacion,
      };
      return nuevasCalificaciones;
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const dataActividades = await evaluadorService.calificacionEvaluador(examenId);
        setActividadesExamen(dataActividades);

        const dataEstudiantes = await evaluadorService.estudiantesExamen(examenId);
        setListaEstudiantes(dataEstudiantes);

        const initialCalificaciones = dataEstudiantes.map((estudiante) => ({
          nombre: estudiante.NOMBRE,
          notas: new Array(dataActividades.length).fill(null),
          observacion: '',
        }));
        setCalificacionExamen(initialCalificaciones);

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

  //   const onEnviarCalificaciones = async (event) => {
  //     event.preventDefault();
  //     try {
  //       const response = await evaluadorService.calificacionActividadEstudiante(
  //         calificacionesEstudiantes
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Error al enviar los datos de la calificacion:", error);
  //     }
  //   };

  return (
    <>
      <form>
        <div>
          {/* <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={onRegresarExamen}
          >
            Regresar
          </Button> */}
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
                    <TableCell align="center">
                        {estudiante.NOMBRE}
                    </TableCell>
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
                              onNotaCalificacion(idSeleccion, indexEstudiante, indexActividad)
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
                        onChange={(event) => onObservacion(event, indexEstudiante)}
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
          {/* <Button
            variant="contained"
            disabled={!botonEnvio}
            onClick={abrirVentanaConfirmacion}
          >
            Enviar Calificacion
          </Button> */}
        </div>
      </form>
    </>
  );
};
