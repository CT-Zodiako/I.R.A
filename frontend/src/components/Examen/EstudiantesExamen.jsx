import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { agregarEstudiantes } from "../../redux/examenSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

export const AgregarListaEstudiantes = ({ setCamposCargados }) => {
  const dispatch = useDispatch();

  const examenForm = useSelector((state) => state.examenFormulario);
  useEffect(() => {
    console.log("formulario examen: ", examenForm);
  }, [examenForm]);

  const [estudianteEstado, setEstudianteEstado] = useState({ NOMBRE: "" });
  const [estudiantesExamen, setEstudiantes] = useState({
    estudiantes: [],
  });

  // const onEstudiante = (event) => {
  //     setEstudianteEstado(event.target.value)
  // }
  const onEstudiante = (event) => {
    const { name, value } = event.target;
    setEstudianteEstado({
      ...estudianteEstado,
      [name]: value,
    });
  };

  const agregarEstudiante = () => {
    setEstudiantes({
      ...estudiantesExamen,
      estudiantes: [...estudiantesExamen.estudiantes, estudianteEstado],
    });
  };

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
        "http://127.0.0.1:3001/examen/ruta_de_carga_de_archivos",
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
        setCamposCargados(true);
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
  };

  return (
    <>
      <div className="informacion">
        <form onSubmit={onEnviarEstudiantes}>
          <div className="componentes">
            <h3>Estudiante</h3>
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
                    variant="outlined"
                    size="small"
                  >
                    Agregar Estudiante
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <TableHead sx={{ background: "rgba(0, 0, 255, 0.5)" }}>
                    <TableRow>
                      <TableCell>Nombre del Estudiante</TableCell>
                      <TableCell>Acción</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {estudiantesExamen.estudiantes.map((estudiante, index) => (
                      <TableRow key={index}>
                        <TableCell scope="row" align="left">
                          {estudiante.NOMBRE}
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            variant="outlined"
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
            <button type="submit">Cargar</button>
          </div>
        </form>
      </div>
    </>
  );
};
