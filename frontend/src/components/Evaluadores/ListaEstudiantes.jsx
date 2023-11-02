import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {LimpiarCalificacion} from '../../redux/calificacionSlice'

export const VistaEstudiantes = () => {  
      
    const dispatch = useDispatch();
    const { examenId } = useParams();
    const[listaEstudiantes, setListaEstudiantes] = useState([]);

    const calificacionesEstudiantes = useSelector(state => state.calificacion);

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

    return(
        <form onSubmit={ onEnviarCalificaciones }>
            <div>
                <button onClick={onRegresarExamen}>
                    <Link to={`/lista_examenes`}>
                        Regresar
                    </Link>
                </button>
                <table>
                    <thead>
                    <tr>
                        <th>Nombre Estudiante</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Codigo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listaEstudiantes.map((estudiante, Index) => (
                    <tr key={Index}>
                        <td>{estudiante.NOMBRE}</td>
                        <td>{estudiante.CORREO}</td>
                        <td>{estudiante.CODIGO}</td>
                        <td>
                            <div>
                            <button type='submit'>
                                    <Link to={`/calificacion-examen/${examenId}/${estudiante.NOMBRE}`}>
                                        Calificar
                                    </Link>
                                </button>
                            </div>  
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
}
