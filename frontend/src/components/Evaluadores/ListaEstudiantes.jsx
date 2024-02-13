import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { LimpiarCalificacion } from '../../redux/calificacionSlice'
import { Alert, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export const VistaEstudiantes = () => {  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const examenId = useSelector((state) => state.calificacion.examen_id);
    const calificaciones = useSelector((state) => state.calificacion.calificacion.length);
    const calificacionesEstudiantes = useSelector(state => state.calificacion);

    const [listaEstudiantes, setListaEstudiantes] = useState([]);
    const nuemeroEstudiantes = listaEstudiantes.length;
    const [botonEnvio, setBotonEnvio] = useState(false)

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

    useEffect(() => {
        const botonEnvio = calificaciones === nuemeroEstudiantes;
        setBotonEnvio(botonEnvio);
    }, [calificaciones, nuemeroEstudiantes]);

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
                    disabled={!botonEnvio}
                >
                    Enviar Calificacion
                </Button>
            </div>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Calificacion Enviada
            </Alert>
        </form>
    );
}
