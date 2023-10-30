import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "react-google-charts";
import informeServicio from '../../services/ServicioInforme'
import evaluadorService from '../../services/servicioEvaluador'

export const PromedioEstudiante =  () => {
    const { evaluadorId } = useParams();
    const [calificaciones, setCalificaciones] = useState([]);
    const [conteo, setConteo] = useState({});
    const [notasCalificacion, setNotasCalificacion] = useState([]);

    const coloresHexadecimales = notasCalificacion.map(item => item.color);

    const onColorPromedio = (promedio) => {
        for (let nota of notasCalificacion) {
            if (promedio >= nota.nota) {
                return nota.color;
            }
        }
        return 'black';
    };

    const datosGrafico = [['Task', 'Hours per Day']].concat(
        Object.entries(conteo).map(([key, value]) => [key, value])
    );

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await informeServicio.promedioEstudiante(evaluadorId);
            setCalificaciones(data);
            console.log(data);
          } catch (error) {
            console.error('Error al obtener el promedio de los estudiantes:', error);
          }
        }
        fetchData();
      }, [evaluadorId]);

      useEffect(() => {
        async function fetchData() {
          try {
            const data = await informeServicio.conteoEstudiante(evaluadorId);
            setConteo(data);
            console.log(data);
          } catch (error) {
            console.error('Error al obtener el conteo:', error);
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
            <div>
                <Chart
                    width={'600px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Cargando gráfico</div>}
                    data={datosGrafico}
                    options={{
                        title: 'Conteo Por Calificacion',
                        colors: coloresHexadecimales,                     
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        </>
    );
}