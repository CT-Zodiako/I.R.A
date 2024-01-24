import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { idExamenCalificacion } from '../../redux/calificacionSlice';
import { 
    Button,
    Table, TableBody, TableCell, 
    TableContainer, TableHead, 
    TablePagination, TableRow
} from "@mui/material";

export const VistaExamenes = () =>{
    const navigate = useNavigate();
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
        navigate(
            `/lista-estudiantes`
        )
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
                    <TableContainer className="bordesTablas">
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
                            <TableHead sx={{ background: "rgba(0, 0, 0, 0.07)" }}>
                            <TableRow>
                                <TableCell align="left" sx={{ fontWeight: 'bold'}}>Programa</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold'}}>Titulo</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold'}}>Estado</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold'}}>Acciones</TableCell>
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
                                <Button 
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    onClick={() => onIdExamen({ examen: examenes.id })}
                                >
                                    Calificar
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