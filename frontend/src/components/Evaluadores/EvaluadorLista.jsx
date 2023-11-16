import { useEffect, useState } from "react";
import evaluadorService from "../../services/servicioEvaluador";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
// import {ModalIRA} from '../Examen/Modal'

export const EvaluadorLista = () => {
  const [evaluadores, setEvaluadores] = useState([]);

  // const [modalAbierto, setModalAbierto] = useState(false);

  // const abrirModal = (evaluadorId) => {
  //   setModalAbierto(true);
  //   setEvaluadorIdSeleccionado(evaluadorId);
  // };

  // const cerrarModal = () => {
  //   setModalAbierto(false);
  //   setEvaluadorIdSeleccionado(null);
  // };

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

  return (
    <>
      <div>
        <div>
          <button>
            <Link to="/gestion-usuario">Agregar Evaluador</Link>
          </button>
        </div>
        <div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead sx={{ background: "rgba(0, 0, 255, 0.5)" }}>
                <TableRow>
                  <TableCell>Nombre del Evaluador</TableCell>
                  <TableCell align="left">Correo</TableCell>
                  <TableCell align="left">Telefono</TableCell>
                  <TableCell align="left">Numero de Identificacion</TableCell>
                  <TableCell align="left">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {evaluadores.map((evaluador) => (
                  <TableRow key={evaluador.id}>
                    <TableCell scope="row" align="left">
                      {evaluador.nombre_evaluador}
                    </TableCell>
                    <TableCell align="left">{evaluador.correo}</TableCell>
                    <TableCell align="left">{evaluador.telefono}</TableCell>
                    <TableCell align="left">
                      {evaluador.numero_identificacion}
                    </TableCell>
                    <TableCell align="left">
                      <button
                        onClick={(event) =>
                          onEliminarEvaluador(event, evaluador.id)
                        }
                      >
                        Eliminar
                      </button>
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
