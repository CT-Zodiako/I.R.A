import { useEffect, useState } from "react";
import resultadoAprendizajeServicio from "../services/ServicioResultadoAprendizaje";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const ResultadoAprendizaje = () => {
  const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await resultadoAprendizajeServicio.traerResultado();
        setResultadoAprendizaje(data);
      } catch (error) {
        console.error("Error al obtener el resultado:", error);
      }
    }
    fetchData();
  }, []);

  const onCambiarEstado = async (event, resultado_Id) => {
    event.preventDefault();
    try {
      await resultadoAprendizajeServicio.cambiarEstado(resultado_Id);
      const nuevaListaResultados = await resultadoAprendizajeServicio.traerResultado();
      setResultadoAprendizaje(nuevaListaResultados);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div>
          <Button
              variant="contained"
              color="success"
              size="small"
            >
              <Link to="/agregar-resultado" style={{ textDecoration: 'none', color: 'white' }}>Agregar Resulatado Aprendizaje</Link>
          </Button>
          {/* <button>
            <Link to="/agregar-resultado">Agregar Resulatado Aprendizaje</Link>
          </button> */}
        </div>
        <div>
          <TableContainer className="bordesTablas">
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead sx={{ background: "rgba(0, 0, 255, 0.4)" }}>
                <TableRow>
                  <TableCell>Titulo</TableCell>
                  <TableCell align="left">Descripcion</TableCell>
                  <TableCell align="left">Estado</TableCell>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultadoAprendizaje.map((resultado) => (
                  <TableRow key={resultado.id}>
                    <TableCell scope="row" align="left">
                      {resultado.titulo}
                    </TableCell>
                    <TableCell align="left">{resultado.descripcion}</TableCell>
                    <TableCell align="left">
                      {resultado.estado ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell align="left">{resultado.id}</TableCell>
                    <TableCell align="left">
                      <Button 
                        variant="contained"
                        color={resultado.estado ? "primary" : "success"}
                        // color="success"
                        // color="primary"
                        size="small"
                        onClick={(event) => onCambiarEstado(event, resultado.id)}
                      >
                        {resultado.estado ? "Desactivar" : "Activar"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};
