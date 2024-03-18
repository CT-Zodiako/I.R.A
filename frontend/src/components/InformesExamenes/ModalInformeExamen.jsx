import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import informeServicio from "../../services/ServicioInforme";
import evaluadorService from "../../services/servicioEvaluador";
import {
  Button, Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableRow,
} from "@mui/material";
import "./styleInforme.css";
import { useSelector } from "react-redux";
import { Tabla } from "../tabla";

export const ModalInformeExamen = ({ abrirInforme, cerrarInforme, descargarPDF }) => {
  const evaluador = useSelector((state) => state.informeExamen.idInforme);  

  const [graficaGeneral, setGraficaGeneral] = useState([]);
  const [graficaActividades, setGraficaActividades] = useState([]); 
  const [actividadesDecripcion, setActividadesDescripcion] = useState([]);
  console.log('Descripcion de actividades: ', actividadesDecripcion);
  const [colorInforme, setColorInforme] = useState([]);  
  console.log('Estado de colorInforme: ', colorInforme);
  
  const columnas = [
    {
      titulo: "Actividad",
      ancho: "100%",
      valor: "descripcion",
    },
   ];

  const coloresFondoPastel = (categorias) => {
    const colorFondo =  categorias.map(categoria => {      
      const color = colorInforme.find((colorNota) => colorNota.label.toLowerCase() === categoria);
      if (color) {
        return { color: color.color };
      } 
    });
    return colorFondo;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if(evaluador){
          const data = await informeServicio.actividadesDescripcion(evaluador);
          setActividadesDescripcion(data.actividades);
        }
      } catch (error) {
        console.error("Error al obtener el conteo:", error);
      }
    }
    fetchData();
  }, [evaluador]);

  useEffect(() => {
    async function fetchData() {
      try {
        if(evaluador){
          const data = await evaluadorService.calificacionEstudiante();
          setColorInforme(data);
        }
      } catch (error) {
        console.error("Error al obtener los datos de calificaciones", error);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
    async function fetchData() {
      try {
        if(evaluador){
          const data = await informeServicio.graficoInformeGeneral(evaluador);
          setGraficaGeneral(data);
        }
      } catch (error) {
        console.error("Error al obtener el conteo:", error);
      }
    }
    fetchData();
  }, [evaluador]);

  useEffect(() => {
    async function fetchData() {
      try {
        if(evaluador){
          const data = await informeServicio.graficoInformeActividades(evaluador);
          setGraficaActividades(data);
        }
      } catch (error) {
        console.error("Error al obtener el conteo:", error);
      }
    }
    fetchData();
  }, [evaluador]);

  return (
    <>
      <Dialog
        open={abrirInforme}
        onClose={cerrarInforme}
        scroll="paper"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <div id="pdf-content">
          <DialogTitle sx={{ background: "rgba( 0, 0, 0 , 0.2)" }}>
            Informe Examen
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Tabla
                datos={actividadesDecripcion}
                columnas={columnas}
                acciones={[]}
                accinar='false'
              />
              <h1>Grafico General:</h1>
                <Chart
                  width={"600px"}
                  height={"400px"}
                  chartType="PieChart"
                  loader={<div>Cargando Grafico</div>}
                  data={[["Actividad", "Calificaciones"]].concat(
                    Object.entries(graficaGeneral).map(([calificacion, value]) => [calificacion, value])
                  )}
                  options={{
                    chart: {
                      title: "Promedio de calificaciones",
                    },
                    slices: coloresFondoPastel(Object.keys(graficaGeneral)),
                  }}
                  rootProps={{ "data-testid": "1" }}
                />
              <h1>Graficos Por Actividade:</h1>
              <div>
                {Object.entries(graficaActividades).map(
                  ([actividad, categorias], index) => (
                  <div key={actividad}>
                    <Chart
                      sx={{ width: "100%", height: "100%" }}
                      chartType="PieChart"
                      loader={<div>Cargando gráfico</div>}
                      data={[
                        ["Actividades", "Cantidades"],
                        ...Object.entries(categorias).map(([categoria, cantidad]) => [categoria, cantidad])
                      ]}
                      options={{
                        title: `Gráfica Actividad ${actividad}`,
                        titleTextStyle: {
                          fontSize: 22,
                        },
                        slices: coloresFondoPastel(Object.keys(categorias)),
                      }}
                      rootProps={{ "data-testid": "1" }}
                    />
                  </div>
                ))}
              </div>
            </DialogContentText>
          </DialogContent>
        </div>
        <DialogActions sx={{ background: "rgba( 0, 0, 0 , 0.2)" }}>
          <Button onClick={cerrarInforme} color="primary">
            Cerrar
          </Button>
          <Button
             onClick={descargarPDF}
          >
            Descargar Informe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
