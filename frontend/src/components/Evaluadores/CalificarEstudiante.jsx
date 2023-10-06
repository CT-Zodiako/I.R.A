import { useEffect, useState } from 'react';
import evaluadorService from '../../services/servicioEvaluador';
import { useParams } from "react-router-dom";
import { InputSeleccionCalificacion } from '../seleccionCalificacion';

export const CalificacionExamen = () =>{
    
    const[calificacion, setCalificacion] = useState({
        value:[],
        observaciones:[]
    });

    const[estudianteCalificacion, setEstudianteExamen] = useState([]);
    const[notasCalificacion, setNotasCalificacion] = useState([]);
    
    const { nombreEstudiante } = useParams();
    const { examenId } = useParams();

    const onNotaCalificacion = (selectedId) => {
        setCalificacion({
          ...calificacion,
          value:[...calificacion.value, selectedId], 
        });
      };

    useEffect(() => {
        async function fetchData() {
            try{
                const data = await evaluadorService.calificacionEvaluador(examenId)
                setEstudianteExamen(data);
            }catch(error) {
                console.error('Error al obtener los datos del estudiante', error)
            }
        }
        fetchData();
    }, [examenId]);

    useEffect(() => {
        async function fetchData() {
            try{
                const data = await evaluadorService.calificacionEstudiante()
                setNotasCalificacion(data);
            }catch(error) {
                console.error('Error al obtener los datos de calificaciones', error)
            }
        }
        fetchData();
    }, []);
    
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
                            {estudianteCalificacion.map((calificar, index) =>(
                                <tr key={index}>
                                    <td>{calificar.descripcion}</td>
                                    <td><InputSeleccionCalificacion
                                            seleccionar={notasCalificacion}
                                            idSeleccion={onNotaCalificacion}/>
                                        </td>
                                    <td>
                                        <textarea 
                                            name="" 
                                            id="" 
                                            cols="30" 
                                            rows="10"
                                        >
                                        </textarea>
                                    </td>
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