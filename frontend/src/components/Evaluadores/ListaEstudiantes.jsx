import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { LimpiarCalificacion } from '../../redux/calificacionSlice'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const VistaEstudiantes = () => {  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { examenId } = useParams();
    // console.log("**creo que este es el id del examen: ",examenId);
    const examenId = useSelector((state) => state.calificacion.examen_id);
    console.log("**id del examen de la store: ",examenId);

    const[listaEstudiantes, setListaEstudiantes] = useState([]);
    console.log("**lista estudiantes por calificar: ",listaEstudiantes);

    const calificacionesEstudiantes = useSelector(state => state.calificacion);
    console.log("**estudiantes calificados por examen: ",calificacionesEstudiantes);

    const onRegresarExamen = () =>{
        dispatch(
            LimpiarCalificacion()
        )
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
                <button onClick={onRegresarExamen}>
                    <Link to={`/lista_examenes`}>
                        Regresar
                    </Link>
                </button>
                <TableContainer className="bordesTablas">
                    <Table>
                        <TableHead sx={{ background: "rgba(0, 0, 0, 0.07)" }}>
                            <TableRow>
                                <TableCell>Nombre Estudiante</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Telefono</TableCell>
                                <TableCell>Codigo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {listaEstudiantes.map((estudiante, Index) => (
                            <TableRow key={Index}>
                                <TableCell>{estudiante.NOMBRE}</TableCell>
                                <TableCell>{estudiante.CORREO}</TableCell>
                                <TableCell>{estudiante.CODIGO}</TableCell>
                                <TableCell>
                                    <div>
                                    {/* <button type='button'>
                                            <Link to={`/calificacion-examen/${examenId}/${estudiante.NOMBRE}`}>
                                                Calificar
                                            </Link>
                                        </button> */}
                                        <button 
                                            type='button'
                                            onClick={() => calificarEstudiante(examenId, estudiante.NOMBRE)}
                                        >
                                            Calificar
                                        </button>
                                    </div>  
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>    
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
}
