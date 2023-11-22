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

  const abrirModal = (evaluadorId) => {
    setEvaluadorIdSeleccionado(evaluadorId);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setEvaluadorIdSeleccionado(null);
    setModalAbierto(false);
    actualizarTabla()
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
            <Link to="/gestion-usuario" style={{ textDecoration: 'none' }}>Agregar Evaluador</Link>
          </Button>
        </div>
        <div>
          <TableContainer className="tablas">
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
                {evaluadores.map((evaluador) => (
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
                            color="error"
                            fontSize="large"
                            onClick={(event) =>
                                onEliminarEvaluador(event, evaluador.id)
                              }
                          />
                        </div>
                        <div>
                          <CreateIcon
                            color="yellow"
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
