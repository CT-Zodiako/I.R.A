import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Chart from "react-google-charts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import informeServicio from '../../services/ServicioInforme'
import evaluadorService from '../../services/servicioEvaluador'

export const PromedioEstudiante =  () => {
    const { evaluadorId } = useParams();
    const [calificaciones, setCalificaciones] = useState([]);
    const [conteo, setConteo] = useState({});
    const [colorInforme, setColorInforme] = useState([]);
    const tableRef = useRef(null);

    const coloresHexadecimales = colorInforme.map(item => item.color);
    console.log(coloresHexadecimales);

    const onColorPromedio = (promedio) => {
        for (let nota of colorInforme) {
            if (promedio >= nota.nota) {
                return nota.color;
            }
        }
        return 'black';
    };

    const datosGrafico = [['Task', 'Hours per Day']].concat(
        Object.entries(conteo).map(([key, value]) => [key, value])
    );

    const asignarColoresFondoPastel = () => {
        const coloresFondo = Object.keys(conteo).map(key => {
            const color = colorInforme.find(item => item.value === key);
            if (color) {
                return { color: color.color };
            } else {
                return { color: '#A4A4A4' }; // Co si no se encuentra ningún color correspondiente
            }
        });
        return coloresFondo;
    };

    const downloadPDF = () => {
        const input = document.getElementById("pdf-content");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("download.pdf");
        });
    };

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await informeServicio.promedioEstudiante(evaluadorId);
            setCalificaciones(data);
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
            setColorInforme(data);
          } catch (error) {
            console.error('Error al obtener los datos de calificaciones', error);
          }
        }
        fetchData();
      }, []);
    
    return(
        <>
            <div id="pdf-content">
                <table ref={tableRef}>
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
                            slices: asignarColoresFondoPastel(),                     
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            </div>
            <button onClick={downloadPDF}>Descargar PDF</button>
        </>
    );
};
