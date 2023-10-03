import { useEffect, useState } from 'react';
import evaluadorService from '../../services/servicioEvaluador';
import {InputSeleccion} from '../EtiquetaSeleccionGeneral';
import { useParams } from "react-router-dom";

export const CalificacionExamen = () =>{
    
    const[estudianteCalificacion, setEstudianteExamen] = useState([]);
    const { nombreEstudiante } = useParams();
    const { examenId } = useParams();
    console.log("soy ", nombreEstudiante, "este es el examen ", examenId );

    useEffect(() => {
        async function fetchData() {
            try{
                const data = await evaluadorService.calificacionEvaluador(examenId)
                console.log('esta debe ser al actividad: ', data);
                setEstudianteExamen(data);
            }catch(error) {
                console.error('Error al obtener los datos del estudiante', error)
            }
        }
        fetchData();
    }, [examenId]);
    
    return(
        <>
        <form action="">
            <div>
                <div>
                    <h1>Calificacion Evaluacion</h1>
                    <h2>Proyecto Integrador</h2>
                    <label htmlFor="">IoT</label>
                </div>
                <div>
                    <h2>Estudiante: {nombreEstudiante} </h2>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Actividad</th>
                                    <th>Calificacion</th>
                                    <th>Observacion</th>
                                </tr>
                            </thead>
                            <tbody>
                            {estudianteCalificacion.map((calificar, Index) =>(
                                <tr key={Index}>
                                    <td>{calificar.descripcion}</td>
                                    <td><InputSeleccion/></td>
                                    <td><textarea name="" id="" cols="30" rows="10"></textarea></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> 
            <button type='submit'>Calificar</button>
        </form> 
        </>
    );
}