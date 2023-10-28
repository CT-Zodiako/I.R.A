import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import informeServicio from '../../services/ServicioInforme'
import evaluadorService from '../../services/servicioEvaluador'

export const PromedioEstudiante =  () => {
    const { evaluadorId } = useParams();
    const [calificaciones, setCalificaciones] = useState([]);
    const [notasCalificacion, setNotasCalificacion] = useState([]);

    const onColorPromedio = (promedio) => {
        for (let nota of notasCalificacion) {
            if (promedio >= nota.nota) {
                return nota.color;
            }
        }
        return 'black'; // Color predeterminado si no se encuentra ninguna coincidencia
    };

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await informeServicio.promedioEstudiante(evaluadorId);
            setCalificaciones(data);
            console.log(data);
          } catch (error) {
            console.error('Error al obtener la lista de examenes:', error);
          }
        }
        fetchData();
      }, [evaluadorId]);

      useEffect(() => {
        async function fetchData() {
          try {
            const data = await evaluadorService.calificacionEstudiante();
            setNotasCalificacion(data);
            console.log(data);
          } catch (error) {
            console.error('Error al obtener los datos de calificaciones', error);
          }
        }
        fetchData();
      }, []);
    
    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>Estudiante</th>
                        <th>Promedio</th>
                    </tr>
                </thead>
                <tbody>
                    {calificaciones.map((promedio, Index) => (
                        <tr key={Index}>
                            <td style={{ backgroundColor: onColorPromedio(promedio.calificacion.promedio) }}>
                                {promedio.nombre}
                            </td>
                            <td style={{ backgroundColor: onColorPromedio(promedio.calificacion.promedio) }}>
                                {promedio.calificacion.promedio}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}