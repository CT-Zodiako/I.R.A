import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Chart from "react-google-charts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import informeServicio from '../../services/ServicioInforme'
import evaluadorService from '../../services/servicioEvaluador'

export const PromedioEstudiante =  () => {
    const { evaluadorId, proyectoIntegrador } = useParams();
    const [calificaciones, setCalificaciones] = useState([]);
    const [promedioGrafica, setPromedioGrafica] = useState([]);
    const [colorInforme, setColorInforme] = useState([]);
    const tableRef = useRef(null);

    console.log("graficas actividades: ",calificaciones.conteo_actividades);
    console.log("promedio de conteo: ", promedioGrafica);

    const coloresHexadecimales = colorInforme.map(item => item.color);

    const onColorPromedio = (promedio) => {
        for (let nota of colorInforme) {
            if (promedio >= nota.nota) {
                return nota.color;
            }
        }
        return 'black';
    };

    const datosGrafico = [['Task', 'Hours per Day']].concat(
        Object.entries(promedioGrafica).map(([key, value]) => [key, value])
    );

    const asignarColoresFondoPastel = () => {
        const coloresFondo = Object.keys(promedioGrafica).map(key => {
            const color = colorInforme.find(item => item.value === key);
            if (color) {
                return { color: color.color };
            } else {
                return { color: '#A4A4A4' };
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
            const data = await informeServicio.promedioGrafica(evaluadorId);
            setPromedioGrafica(data);
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
                <h2>{proyectoIntegrador}</h2>
                {Array.isArray(calificaciones.evaluadores_totales) ? (
                    calificaciones.evaluadores_totales.map((nombre, index) => (
                        <h2 key={index}>{nombre}</h2>
                    ))
                    ) : (
                    <p>No hay evaluadores disponibles.</p>
                    )}

                <div>
                {Array.isArray(calificaciones.observaciones_totales) ? (
                    calificaciones.observaciones_totales.map((nombre, index) => (
                        <h6 key={index}>{nombre}</h6>
                    ))
                    ) : (
                    <p>No hay evaluadores disponibles.</p>
                    )}
                </div>

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
                <h1>Promedio Por Actividades</h1>
                <div>
                  {calificaciones.conteo_actividades &&
                    Object.entries(calificaciones.conteo_actividades).map(([actividad, categorias]) => (
                      <Chart
                        key={actividad}
                        width={'600px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Cargando gráfico</div>}
                        data={[
                          ['Categoría', 'Cantidad'],
                          ...Object.entries(categorias).map(([categoria, cantidad]) => [categoria, cantidad])
                        ]}
                        options={{
                            title: 'Conteo Por Calificacion',
                            slices: asignarColoresFondoPastel(),                     
                        }}
                        rootProps={{ 'data-testid': '1' }}
                      />
                  ))}
                </div>
            </div>
            <button onClick={downloadPDF}>Descargar PDF</button>
        </>
    );
};
