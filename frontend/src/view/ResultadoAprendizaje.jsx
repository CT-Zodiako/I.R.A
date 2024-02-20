import { useEffect, useState } from "react";
import resultadoAprendizajeServicio from "../services/ServicioResultadoAprendizaje";
import { Link } from "react-router-dom";
import {
  Button, Modal, Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableRow, TextField,
} from "@mui/material"
import { CrearResultadoAprendizaje } from "../components/ResultadoComponentes/ModalCrearResultadoAprendizaje"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

export const ResultadoAprendizaje = () => {
  const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);
  const [filtrar, setFiltrar] = useState('');
  const [modalResultadoAprendizaje, setModalResultadoAprendizaje] = useState(false);

  const buscarResultadoAprendizaje = (event) => {
    setFiltrar(event.target.value);
  }

  const filteredResultados = resultadoAprendizaje.filter(resultado =>
    resultado.titulo.toLowerCase().includes(filtrar.toLowerCase())
  );

  const abrirModal = () => {
    setModalResultadoAprendizaje(true);
  };

  const cerrarModal = () => {
    setModalResultadoAprendizaje(false);
  };

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
        <div className="titulos">
          <h1>Resultado Aprendizaje</h1>
        </div>
        <div className="busquedaResultadoAprendizaje">
          <div>
            <Button
                variant="contained"
                color="success"
                sx={{ height: "2.5rem"}}
                onClick={abrirModal}
              >
                <AddCircleOutlineIcon fontSize="small" sx={{ marginRight: "0.3rem" }} />
                Agregar Resulatado Aprendizaje
            </Button>
          </div>
          <div className="resultadoAprendizaje">
            <TextField
              sx={{ width: "24rem", minWidth: "12rem" }}
              id="outlined-basic"
              placeholder="Filtrar por Resultado Aprendizaje"
              variant="outlined"
              value={filtrar}
              onChange={ buscarResultadoAprendizaje }
              InputProps={{
                startAdornment:(
                  <FilterAltIcon
                    sx={{ color: "rgba(0, 0, 0, 0.25)" }}
                  />
                ),
              }}
            />
          </div>
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
                        {resultado.estado ? <BlockIcon fontSize="small" sx={{ marginRight: "0.1rem"}}/> : <CheckCircleOutlineIcon fontSize="small" sx={{ marginRight: "0.1rem"}}/>}
                        {resultado.estado ? "Desactivar" : "Activar"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <CrearResultadoAprendizaje 
            abierto={modalResultadoAprendizaje}
            cerrado={cerrarModal}
          />
        </div>
      </div>
    </>
  );
};
