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
  TextField,
} from "@mui/material";

export const ResultadoAprendizaje = () => {
  const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);
  const [filtrar, setFiltrar] = useState('');

  const buscarResultadoAprendizaje = (event) => {
    setFiltrar(event.target.value);
  }

  const filteredResultados = resultadoAprendizaje.filter(resultado =>
    resultado.titulo.toLowerCase().includes(filtrar.toLowerCase())
  );

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
      <div className="componentes">
        <div>
          <Button
              variant="contained"
              color="success"
              size="small"
            >
              <Link to="/agregar-resultado" className="botonAgregar">Agregar Resulatado Aprendizaje</Link>
          </Button>
          
            <TextField
              sx={{ width: "24rem", marginLeft: "12rem"}}
              id="outlined-basic"
              placeholder="Filtrar por Resultado Aprendizaje"
              variant="outlined"
              value={filtrar}
              // onChange={(event) => setFiltrar(event.target.value)}
              onChange={ buscarResultadoAprendizaje }
              >
            </TextField>
          {/* <Button
            variant="contained"
            color="success"
            size="small"
            onChange={ buscarResultadoAprendizaje }
          >
            Buscar
          </Button> */}

          {/* <button>
            <Link to="/agregar-resultado">Agregar Resulatado Aprendizaje</Link>
          </button> */}
        </div>
        <div>
          <TableContainer className="tablas">
            <Table aria-label="caption table">
              <TableHead className="tablaEncabezado">
                <TableRow>
                  <TableCell align="center">Resultado Aprendizaje</TableCell>
                  <TableCell align="center">Descripcion</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResultados.map((resultado) => (
                  <TableRow key={resultado.id} className="tablaBody">
                    <TableCell scope="row" align="center" className="resultadoTitulo">
                      {resultado.titulo}
                    </TableCell>
                    <TableCell align="left" className="resultadoDescripcion">
                      <div>
                        {resultado.descripcion}
                      </div>
                    </TableCell>
                    <TableCell align="center" className="resultadoEstado">
                      {resultado.estado ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell align="center" className="resultadoId">
                      {resultado.id}
                    </TableCell>
                    <TableCell align="center" className="resultadoAccion">
                      <Button 
                        variant="contained"
                        color={resultado.estado ? "primary" : "success"}

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
