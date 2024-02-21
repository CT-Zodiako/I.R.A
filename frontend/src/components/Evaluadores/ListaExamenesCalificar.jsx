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

    const [listaExamenesEvaluador, setListaExamenesEvaluador]= useState([]);
    const [paginasTabla, setPaginasTabla] = useState(0);
    const [filasPaginaTabla, setFilasPaginaTabla] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPaginasTabla(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setFilasPaginaTabla(parseInt(event.target.value, 10));
        setPaginasTabla(0);
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
                    <TableContainer className="tablas">
                        <Table aria-label="caption table">
                            <TableHead className="tablaEncabezado">
                            <TableRow>
                                <TableCell align="center">Programa</TableCell>
                                <TableCell align="center">Titulo</TableCell>
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {(filasPaginaTabla > 0
                            ? listaExamenesEvaluador.slice(paginasTabla * filasPaginaTabla, paginasTabla * filasPaginaTabla + filasPaginaTabla)
                            : listaExamenesEvaluador
                            ).map((examenes) => (
                                <TableRow key={examenes.id}>
                                <TableCell scope="row" align="left">
                                    {examenes.programa_id}
                                </TableCell>
                                <TableCell align="left">
                                    {examenes.proyecto_integrador}
                                </TableCell>
                                <TableCell align="center">
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
                            rowsPerPage={filasPaginaTabla}
                            page={paginasTabla}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                </div>
            </div>
        </>
    );
}