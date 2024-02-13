import { useEffect, useState } from "react";
import evaluadorService from "../../services/servicioEvaluador";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow 
} from "@mui/material";
import { ModalIRA } from "../Examen/ModalEditarEvaluador"
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import { ModalCrearEvaluador } from "./ModalCrearEvaluador";

export const EvaluadorLista = () => {
  const [evaluadores, setEvaluadores] = useState([]);
  const [modalAbiertoCrear, setModalAbiertoCrear] = useState(false);
  const [modalAbiertoEditar, setModalAbiertoEditar] = useState(false);
  const [evaluadorIdSeleccionado, setEvaluadorIdSeleccionado] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const abrirModalCrear = () => {
    setModalAbiertoCrear(true);
  };

  const cerrarModalCrear = () => {
    setModalAbiertoCrear(false);
    actualizarTabla()
  };
  
  const abrirModalEditar = (evaluadorId) => {
    setEvaluadorIdSeleccionado(evaluadorId);
    setModalAbiertoEditar(true);
  };

  const cerrarModalEditar = () => {
    setEvaluadorIdSeleccionado(null);
    setModalAbiertoEditar(false);
    actualizarTabla()
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await evaluadorService.traerEvaluador();
        setEvaluadores(data);
      } catch (error) {
        console.error("Error al obtener el resultado:", error);
      }
    }
    fetchData();
  }, []);

  const onEliminarEvaluador = async (event, evaluador_Id) => {
    event.preventDefault();
    try {
      await evaluadorService.eliminarEvaluador(evaluador_Id);
      const nuevaListaEvaluador = await evaluadorService.traerEvaluador();
      setEvaluadores(nuevaListaEvaluador);
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarTabla = async () => {
    try {
      const data = await evaluadorService.traerEvaluador();
      setEvaluadores(data);
    } catch (error) {
      console.error("Error al obtener el resultado:", error);
    }
  };

  useEffect(() => {
    actualizarTabla();
  }, []);

  return (
    <>
      <div className="componentes">
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={ abrirModalCrear }
          >
            Agregar Evaluador
            {/* <Link to="/gestion-usuario" className="botonAgregar">Agregar Evaluador</Link> */}
          </Button>
        </div>
        <div>
          <TableContainer className="tablas">
            <Table aria-label="caption table">
              <TableHead className="tablaEncabezado">
                <TableRow>
                  <TableCell align="center">Nombre del Evaluador</TableCell>
                  <TableCell align="center">Correo</TableCell>
                  <TableCell align="center">Telefono</TableCell>
                  <TableCell align="center">Numero de Identificacion</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {(rowsPerPage > 0
                  ? evaluadores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : evaluadores
                ).map((evaluador) => (
                  <TableRow key={evaluador.id} className="tablaBody">
                    <TableCell scope="row" align="left" className="evaluadoreNombre">
                      {evaluador.nombre_evaluador}
                    </TableCell>
                    <TableCell align="left" className="evaluadorCorreo">
                      {evaluador.correo}
                    </TableCell>
                    <TableCell align="center" className="evaluadorTelefono">
                      {evaluador.telefono}
                    </TableCell>
                    <TableCell align="center" className="evaluadorId">
                      {evaluador.numero_identificacion}
                    </TableCell>
                    <TableCell align="center" className="evaluadorEstado">                                          
                      {evaluador.estado ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell align="center" className="evaluadorAccion" >
                      <div className="botonesMargen">
                        <div>
                          <ClearIcon 
                            className="colorEliminar"
                            fontSize="large"
                            onClick={(event) =>
                                onEliminarEvaluador(event, evaluador.id)
                              }
                          />
                        </div>
                        <div>
                          <CreateIcon
                            className="colorEditar"
                            fontSize="large"
                            onClick={() => abrirModalEditar(evaluador.id)}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            count={evaluadores.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <ModalIRA
        isOpen={modalAbiertoEditar}
        onClose={cerrarModalEditar}
        evaluadorId={evaluadorIdSeleccionado}
      />
      <ModalCrearEvaluador
        isOpen={modalAbiertoCrear}
        onClose={cerrarModalCrear}
      />
    </>
  );
};
