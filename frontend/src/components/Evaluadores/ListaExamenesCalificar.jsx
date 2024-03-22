import { useEffect, useState } from "react";
import evaluadorService from "../../services/servicioEvaluador";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { idExamenCalificacion } from "../../redux/calificacionSlice";
import programaServicio from "../../services/ServicioPrograma";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

export const VistaExamenes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const evaluadorId = useSelector((state) => state.sesion.id);

  const [listaExamenesEvaluador, setListaExamenesEvaluador] = useState([]);
  const [programasAcademicos, setProgramasAcademicos] = useState([]);
  const [paginasTabla, setPaginasTabla] = useState(0);
  const [filasPaginaTabla, setFilasPaginaTabla] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPaginasTabla(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setFilasPaginaTabla(parseInt(event.target.value, 10));
    setPaginasTabla(0);
  };

  const onCalificarExamen = ({ examen }) => {
    const examenId = examen;
    dispatch(
      idExamenCalificacion({
        examenId: examenId,
        evaluadorId: evaluadorId,
      })
    );
    navigate(`/calificacionExamen`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await programaServicio.traerPrograma();
        setProgramasAcademicos(data);
      } catch (error) {
        console.error("Error al obtener la lista de programas:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await evaluadorService.examenesEvaluador(evaluadorId);
        setListaExamenesEvaluador(data);
      } catch (error) {
        console.error("Error al obtener la lista de examenes:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="cabecera">
            <h1>Bandeja de entrada</h1>
        </div>
        <div className="cuerpo"></div>
        <div className="tablascontenido">
          <TableContainer className="tablas">
            <Table aria-label="caption table">
              <TableHead className="tablaEncabezado">
                <TableRow>
                  <TableCell className=" bordeVerticar" align="center">Programa</TableCell>
                  <TableCell className=" bordeVerticar" align="center">Titulo</TableCell>
                  <TableCell className=" bordeVerticar" align="center">Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(filasPaginaTabla > 0
                  ? listaExamenesEvaluador.slice(
                      paginasTabla * filasPaginaTabla,
                      paginasTabla * filasPaginaTabla + filasPaginaTabla
                    )
                  : listaExamenesEvaluador
                ).map((examenes) => (
                  <TableRow key={examenes.id}>
                    <TableCell className=" bordeVerticar" scope="row" align="center">
                      {
                        programasAcademicos.find(
                          (programa) => programa.id === examenes.programa_id
                        ).nombre
                      }
                    </TableCell>
                    <TableCell className=" bordeVerticar" align="left">
                      {examenes.proyecto_integrador}
                    </TableCell>
                    <TableCell className=" bordeVerticar" align="center">Pendiente</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() =>
                          onCalificarExamen({ examen: examenes.id })
                        }
                      >
                        Nuevo
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={listaExamenesEvaluador.length}
            rowsPerPage={filasPaginaTabla}
            page={paginasTabla}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
};
