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
import { ModalIRA } from "../Examen/Modal"
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';

export const EvaluadorLista = () => {
  const [evaluadores, setEvaluadores] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [evaluadorIdSeleccionado, setEvaluadorIdSeleccionado] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const abrirModal = (evaluadorId) => {
    setEvaluadorIdSeleccionado(evaluadorId);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setEvaluadorIdSeleccionado(null);
    setModalAbierto(false);
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="success"
            size="small"
          >
            <Link to="/gestion-usuario" style={{ textDecoration: 'none', color: 'white' }}>Agregar Evaluador</Link>
          </Button>
        </div>
        <div>
          <TableContainer className="bordesTablas">
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead sx={{ background: "rgba(0, 0, 255, 0.5)" }}>
                <TableRow>
                  <TableCell>Nombre del Evaluador</TableCell>
                  <TableCell align="left">Correo</TableCell>
                  <TableCell align="left">Telefono</TableCell>
                  <TableCell align="left">Numero de Identificacion</TableCell>
                  <TableCell align="left">Estado</TableCell>
                  <TableCell align="left">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {(rowsPerPage > 0
                  ? evaluadores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : evaluadores
                ).map((evaluador) => (
                  <TableRow key={evaluador.id}>
                    <TableCell scope="row" align="left">
                      {evaluador.nombre_evaluador}
                    </TableCell>
                    <TableCell align="left">
                      {evaluador.correo}
                    </TableCell>
                    <TableCell align="left">
                      {evaluador.telefono}
                    </TableCell>
                    <TableCell align="left">
                      {evaluador.numero_identificacion}
                    </TableCell>
                    <TableCell>                                          
                      {evaluador.estado ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell align="left">
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
                            onClick={() => abrirModal(evaluador.id)}
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
        isOpen={modalAbierto}
        onClose={cerrarModal}
        evaluadorId={evaluadorIdSeleccionado}
      />
    </>
  );
};
