import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { LimpiarCalificacion } from '../../redux/calificacionSlice'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const VistaEstudiantes = () => {  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { examenId } = useParams();
    // console.log("**creo que este es el id del examen: ",examenId);
    const examenId = useSelector((state) => state.calificacion.examen_id);
    const[listaEstudiantes, setListaEstudiantes] = useState([]);
    const calificacionesEstudiantes = useSelector(state => state.calificacion);

    const onRegresarExamen = () =>{
        dispatch(
            LimpiarCalificacion()
        ),
        navigate(`/lista_examenes`);

    }

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await evaluadorService.estudiantesExamen(examenId);
            setListaEstudiantes(data);
          } catch (error) {
            console.error('Error al obtener la lista de examenes:', error);
          }
        }
        fetchData();
    }, [examenId]);

    const onEnviarCalificaciones = async(event) => {
        event.preventDefault();
        try {
          const response = await  evaluadorService.calificacionActividadEstudiante(calificacionesEstudiantes);
          console.log(response);
        } catch (error) {
          console.error('Error al enviar los datos de la calificacion:', error);
        }
    };

    const calificarEstudiante = (examenId, nombreEstudiante) => {
        navigate(`/calificacion-examen`, {
          state: {
            examenId: examenId,
            nombreEstudiante: nombreEstudiante,
          },
        });
      };

    return(
        <form onSubmit={ onEnviarCalificaciones }>
            <div>
                <Button 
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={onRegresarExamen}
                >
                    Regresar
                </Button>
                <TableContainer className="tablas">
                    <Table>
                        <TableHead className="tablaEncabezado">
                            <TableRow>
                                <TableCell align="center">Nombre Estudiante</TableCell>
                                <TableCell align="center">Correo</TableCell>
                                <TableCell align="center">Telefono</TableCell>
                                <TableCell align="center">Codigo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {listaEstudiantes.map((estudiante, Index) => (
                            <TableRow key={Index}>
                                <TableCell align="left">{estudiante.NOMBRE}</TableCell>
                                <TableCell align="left">{estudiante.CORREO}</TableCell>
                                <TableCell align="center">{estudiante.CODIGO}</TableCell>
                                <TableCell align="center">
                                    <div>
                                    {/* <button type='button'>
                                            <Link to={`/calificacion-examen/${examenId}/${estudiante.NOMBRE}`}>
                                                Calificar
                                            </Link>
                                        </button> */}
                                        <Button 
                                            type='button'
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            onClick={() => calificarEstudiante(examenId, estudiante.NOMBRE)}
                                        >
                                            Calificar
                                        </Button>
                                    </div>  
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>    
            </div>
            <div style={{ display: "flex", justifyContent: "end", padding: "2 rem 5rem" }}>
                <Button 
                    variant="contained"
                    type="submit"
                >
                    Enviar
                </Button>
                {/* <button type="submit">Enviar</button> */}
            </div>
        </form>
    );
}
