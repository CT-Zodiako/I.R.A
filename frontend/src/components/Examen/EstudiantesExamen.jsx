import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { agregarEstudiantes } from "../../redux/examenSlice";
import examenService from "../../services/ServiciosExamen"
import {
  Button, Table, TableBody, 
  TableCell, TableContainer, 
  TableHead, TablePagination,
  TableRow, TextField,
} from "@mui/material";
import { BotonGeneral } from "../botonGeneral"
import { BotonRegresar } from "./botonRegresar"

export const AgregarListaEstudiantes = ({ setCamposCargados, examenId, accion, anterior }) => {
  const dispatch = useDispatch();
  const infoEstudianteStore = useSelector((state) => state.examenFormulario);

  const [estudianteEstado, setEstudianteEstado] = useState({ NOMBRE: "" });
  const [estudiantesExamen, setEstudiantes] = useState({estudiantes: infoEstudianteStore.estudiantes});

  const regresarPanelExamen = () => {
    anterior();
  };

  const onEstudiante = (event) => {
    const { name, value } = event.target;
    setEstudianteEstado({
      ...estudianteEstado,
      [name]: value,
    });
  };

  const agregarEstudiante = () => {
    if(estudianteEstado.NOMBRE){
      setEstudiantes({
        ...estudiantesExamen,
        estudiantes: [...estudiantesExamen.estudiantes, estudianteEstado],
      });
    };
    setEstudianteEstado({ NOMBRE: "" });
  };

  if(accion === 'editar'){
    useEffect(()=>{
      async function fetchData() {
        try{
          const responce = await examenService.examenPorId(examenId);
          setEstudiantes({
            ...estudiantesExamen,
            estudiantes: responce.estudiantes
          })
        } catch (error) {
          console.error("No se puedo obtener la informacion del examen: ", error);
        }
      }
      fetchData()
    }, [])
  }

  const eliminarEstudianteLista = (index) => {
    const nuevoFormulario = { ...estudiantesExamen };
    const nuevoEstudiante = [...nuevoFormulario.estudiantes];
    nuevoEstudiante.splice(index, 1);
    nuevoFormulario.estudiantes = nuevoEstudiante;
    setEstudiantes(nuevoFormulario);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("archivo", file);

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/examen/ruta_de_carga_de_archivos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setEstudiantes({
          ...estudiantesExamen,
          estudiantes: response.data,
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onEnviarEstudiantes = async (event) => {
    event.preventDefault();
    dispatch(
      agregarEstudiantes({
        estudiantes: estudiantesExamen.estudiantes,
      })
    );
    setCamposCargados(true)
  };

  return (
    <>
      <div>
        <div className="botonRegresar">
          <BotonRegresar
            regresar={ regresarPanelExamen }
          />
        </div>
        <div className="informacion">
          <form onSubmit={onEnviarEstudiantes}>
            <div className="componentes">
              <h2>Panel Estudiante Examen</h2>
              <div>
                <div className="centrar">
                  <input type="file" accept="xlsx" onChange={handleFileUpload} />
                </div>
                <div className="centrar">
                  <div className="centrar">
                    <TextField
                      sx={{ width: "21rem", margin: "10px" }}
                      id="outlined-basic"
                      type="text"
                      label="Nombre del estudiante"
                      name="NOMBRE"
                      value={estudianteEstado.NOMBRE}
                      onChange={onEstudiante}
                    />
                  </div>
                  <div className="centrar">
                    <Button
                      type="button"
                      onClick={agregarEstudiante}
                      className="textButton"
                      variant="contained"
                      size="small"
                    >
                      <div>
                        Agregar
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <TableContainer sx={{ width: "40rem" }} className="tablas">
                  <Table aria-label="caption table">
                    <TableHead className="tablaEncabezado">
                      <TableRow>
                        <TableCell align="center">Nombre del Estudiante</TableCell>
                        <TableCell align="center">Acción</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {estudiantesExamen.estudiantes.map((estudiante, index) => (
                        <TableRow key={index}>
                          <TableCell scope="row" align="left" className="estudianteNombre">
                            <div>
                              {estudiante.NOMBRE}
                            </div>
                          </TableCell>
                          <TableCell align="center" className="estudianteAccion">
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "red"}}
                              type="button"
                              size="small"
                              onClick={() => eliminarEstudianteLista(index)}
                            >
                              Eliminar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <div>
              <BotonGeneral
                tipo="submit"
                accion="Cargar"
                camposCargados={estudiantesExamen.estudiantes.length >= 1}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
