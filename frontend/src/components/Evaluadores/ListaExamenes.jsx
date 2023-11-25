import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { idExamenCalificacion } from '../../redux/calificacionSlice';
import { 
    Table, TableBody, TableCell, 
    TableContainer, TableHead, 
    TablePagination, TableRow
} from "@mui/material";

export const VistaExamenes = () =>{

    const dispatch = useDispatch();
    const evaluadorId = useSelector((state) => state.sesion.id);

    const[listaExamenesEvaluador, setListaExamenesEvaluador]= useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const onIdExamen = ({ examen }) => {
        const examenId = examen;
        dispatch(
            idExamenCalificacion({ 
                examenId: examenId, 
                evaluadorId: evaluadorId
            })
        );
    }

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await evaluadorService.examenesEvaluador(evaluadorId);
            setListaExamenesEvaluador(data);
          } catch (error) {
            console.error('Error al obtener la lista de examenes:', error);
          }
        }
        fetchData();
      }, []);

    return(
        <>
            <div>
                <div>
                    {/* <table>
                        <thead>
                        <tr>
                            <th>Programa</th>
                            <th>Titulo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listaExamenesEvaluador.map((examenes) => (
                        <tr key={examenes.id}>
                            <td>{examenes.programa_id}</td>
                            <td>{examenes.proyecto_integrador}</td>
                            <td>Pendiente</td>
                            <td>
                                <button onClick={() => onIdExamen({ examen: examenes.id })}>
                                    <Link to={`/lista-estudiantes/${examenes.id}`}>
                                        Calificar
                                    </Link>
                                </button>
                            </td>
                        </tr>
                        ))}
                        </tbody>
                    </table> */}
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
                            <TableHead sx={{ background: "rgba(0, 0, 255, 0.5)" }}>
                            <TableRow>
                                <TableCell>Programa</TableCell>
                                <TableCell align="left">Titulo</TableCell>
                                <TableCell align="left">Estado</TableCell>
                                <TableCell align="left">Acciones</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {(rowsPerPage > 0
                            ? listaExamenesEvaluador.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : listaExamenesEvaluador
                            ).map((examenes) => (
                                <TableRow key={examenes.id}>
                                <TableCell scope="row" align="left">
                                    {examenes.programa_id}
                                </TableCell>
                                <TableCell align="left">
                                    {examenes.proyecto_integrador}
                                </TableCell>
                                <TableCell align="left">
                                    Pendiente
                                </TableCell>
                                <TableCell align="left">
                                <button onClick={() => onIdExamen({ examen: examenes.id })}>
                                    <Link to={`/lista-estudiantes/${examenes.id}`}>
                                        Calificar
                                    </Link>
                                </button>
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
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </>
    );
}