import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Chart from "react-google-charts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import informeServicio from "../../services/ServicioInforme";
import evaluadorService from "../../services/servicioEvaluador";
import { 
  Table, TableBody, 
  TableCell, TableContainer, 
  TableHead, TableRow 
} from "@mui/material";

export const PromedioEstudiante = () => {
  const location = useLocation();
  const evaluadorId = location.state.evaluadorId;
  const proyectoIntegrador = location.state.proyectoIntegrador;

  const [calificaciones, setCalificaciones] = useState([]);
  const [promedioGrafica, setPromedioGrafica] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [colorInforme, setColorInforme] = useState([]);
  const tableRef = useRef(null);

  const onColorPromedio = (promedio) => {
    for (let nota of colorInforme) {
      if (promedio >= nota.nota) {
        return nota.color;
      }
    }
    return "black";
  };

  const datosGrafico = [["Task", "Hours per Day"]].concat(
    Object.entries(promedioGrafica).map(([key, value]) => [key, value])
  );

  const asignarColoresFondoPastel = () => {
    const coloresFondo = Object.keys(promedioGrafica).map((key) => {
      const color = colorInforme.find((item) => item.value === key);
      if (color) {
        return { color: color.color };
      } else {
        return { color: "#A4A4A4" };
      }
    });
    return coloresFondo;
  };

  const downloadPDF = () => {
    const input = document.getElementById("pdf-content");
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    html2canvas(input).then((canvas) => {
      const totalHeight = canvas.height;
      let currentPosition = 0;
  
      while (currentPosition < totalHeight) {
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, currentPosition, pdfWidth, pdfHeight);
        currentPosition += pdfHeight;
  
        if (currentPosition < totalHeight) {
          pdf.addPage();
        }
      }
  
      pdf.save("download.pdf");
    });
  };  

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await informeServicio.promedioEstudiante(evaluadorId);
        setCalificaciones(data);
      } catch (error) {
        console.error(
          "Error al obtener el promedio de los estudiantes:",
          error
        );
      }
    }
    fetchData();
  }, [evaluadorId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await informeServicio.promedioGrafica(evaluadorId);
        setPromedioGrafica(data);
        console.log("graficas actividad: ", data);
      } catch (error) {
        console.error("Error al obtener el conteo:", error);
      }
    }
    fetchData();
  }, [evaluadorId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await informeServicio.actividadesExamen(evaluadorId);
        setActividades(data.actividades);
      } catch (error) {
        console.error("Error al obtener el conteo:", error);
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
        console.error("Error al obtener los datos de calificaciones", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div id="pdf-content">        
        <h2>Proyecto Integrador</h2>
        <h3>{proyectoIntegrador}</h3>
        <hr/>
        <h2>Evaluadores</h2>
        {Array.isArray(calificaciones.evaluadores_totales) ? (
          calificaciones.evaluadores_totales.map((nombre, index) => (
            <h3 key={index}>{nombre}</h3>
          ))
        ) : (
          <p>No hay evaluadores disponibles.</p>
        )}

        <div>
          <hr/>
          <h2>Descripcion Actividades</h2>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead sx={{ background: "rgba(0, 0, 255, 0.5)" }}>
                  <TableRow>
                    <TableCell>Actividad</TableCell>
                    <TableCell>N° Grafica</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {actividades.map((actividad, index) => (
                  <TableRow key={index}>
                    <TableCell scope="row" align="left">
                      {actividad.descripcion.descripcion}
                    </TableCell>
                    <TableCell align="left">
                       Grafica {index+1}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div>
          <hr/>
          <h2>Conteo General</h2>
          <Chart
            width={"600px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Cargando gráfico</div>}
            data={datosGrafico}
            options={{
              slices: asignarColoresFondoPastel(),
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </div>
        <div>
          <hr/>
          <h2>Conteo Por Actividades</h2>
          {calificaciones.conteo_actividades &&
            Object.entries(calificaciones.conteo_actividades).map(
              ([actividad, categorias], index) => (
                <div key={actividad}>
                  <Chart
                    width={"600px"}
                    height={"300px"}
                    chartType="PieChart"
                    loader={<div>Cargando gráfico</div>}
                    data={[
                      ["Categoría", "Cantidad"],
                      ...Object.entries(categorias).slice(0, -1).map(
                        ([categoria, cantidad]) => [categoria, cantidad]
                      ),
                    ]}
                    options={{
                      title: `Grafica ${categorias.descripcion_actividad}`,
                      titleTextStyle: {
                      fontSize: 24,
                      },
                      slices: asignarColoresFondoPastel(),
                    }}
                    rootProps={{ "data-testid": "1" }}
                  />
                </div>
              )
            )}
        </div>
        <div>
          <hr/>
          <h2>Observaciones</h2>
          {Array.isArray(calificaciones.observaciones_totales) ? (
            calificaciones.observaciones_totales.map((nombre, index) => (
              <h3 key={index}>{nombre}</h3>
            ))
          ) : (
            <p>No hay evaluadores disponibles.</p>
          )}
        </div>
      </div>
      <button onClick={downloadPDF}>Descargar PDF</button>
    </>
  );
};
