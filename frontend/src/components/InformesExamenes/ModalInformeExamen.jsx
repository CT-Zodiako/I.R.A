import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import informeServicio from "../../services/ServicioInforme";
import evaluadorService from "../../services/servicioEvaluador";
import examenService from "../../services/ServiciosExamen";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./styleInforme.css";
import { useSelector } from "react-redux";

export const ModalInformeExamen = ({
  abrirInforme,
  cerrarInforme,
  descargarPDF,
  datosInforme,
}) => {
  const informe = useSelector((state) => state.informeExamen.idInforme);
  const programa = useSelector((state) => state.programa.programa);

  const [graficaGeneral, setGraficaGeneral] = useState([]);
  const [graficaActividades, setGraficaActividades] = useState([]);
  const [colorInforme, setColorInforme] = useState([]);
  const [listaExamenes, setListaExamenes] = useState([]);
  const [evaluadores, setEvaluadores] = useState([]);
  console.log('evaluadores del sistemma: ', evaluadores);
  
  const informeExamen = listaExamenes.find((examen) => examen.id === informe);
  console.log("informe del examen", informeExamen);
  const informeDatos = datosInforme.find((informes) => informes.id === informe);
  console.log("datos del informe actividades: ", informeDatos);

  const coloresFondoPastel = (categorias) => {
    const colorFondo = categorias.map((categoria) => {
      const color = colorInforme.find(
        (colorNota) => colorNota.label.toLowerCase() === categoria
      );
      if (color) {
        return { color: color.color };
      }
    });
    return colorFondo;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (informe) {
          const data = await informeServicio.actividadesDescripcion(informe);
          setActividadesDescripcion(data.actividades);
        }
      } catch (error) {
        console.error("Error al obtener el conteo:", error);
      }
    }
    fetchData();
  }, [informe]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (informe) {
          const data = await informeServicio.graficoInformeGeneral(informe);
          setGraficaGeneral(data);
        }
      } catch (error) {
        console.error("Error al obtener el conteo:", error);
      }
    }
    fetchData();
  }, [informe]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (informe) {
          const data = await informeServicio.graficoInformeActividades(informe);
          setGraficaActividades(data);
        }
      } catch (error) {
        console.error("Error al obtener el conteo:", error);
      }
    }
    fetchData();
  }, [informe]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (informe) {
          const data = await evaluadorService.calificacionEstudiante();
          setColorInforme(data);

          const evaluadores = await evaluadorService.traerEvaluador();
          setEvaluadores(evaluadores);
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
        if (programa) {
          const examenes = await examenService.ExamenesCreados(programa);
          setListaExamenes(examenes);
        }
      } catch (error) {
        console.error("Error al obtener la lista: ", error);
      }
    }
    fetchData();
  }, [programa]);

  return (
    <>
      <Dialog
        open={abrirInforme}
        onClose={cerrarInforme}
        scroll="paper"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        width="md"
      >
        <div>
          <DialogTitle sx={{ background: "rgba( 0, 0, 0 , 0.2)" }}>
            Informe Examen
          </DialogTitle>
          <div id="pdf-content">
            <DialogContent>
              <DialogContentText>
                <div style={{ maxWidth: "100%" }}>
                  <h1>
                    {informeExamen ? informeExamen.proyecto_integrador : null}
                  </h1>
                  <h2>
                    {informeDatos ? informeDatos.resultado_aprendizaje_nombre : null}
                  </h2>
                  <h3>
                    {informeDatos ? informeDatos.resultado_aprendizaje_descripcion : null}
                  </h3>
                </div>
                <div>
                  <TableContainer className="tablas">
                    <Table>
                      <TableHead className="tablaEncabezado">
                        <TableRow>
                          <TableCell align="center">
                            Actividad Formativa
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {informeExamen
                          ? informeExamen.actividades_formativas.map(
                              (actividad, index) => (
                                <TableRow key={index}>
                                  <TableCell align="center">
                                    {actividad}
                                  </TableCell>
                                </TableRow>
                              )
                            )
                          : null}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div>
                  <TableContainer className="tablas">
                    <Table>
                      <TableHead className="tablaEncabezado">
                        <TableRow>
                          <TableCell className=" bordeVerticar" align="center">
                            ID
                          </TableCell>
                          <TableCell align="center">
                            EVALUADORES DEL EXAMEN
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="tablasCuerpo">
                        {informeExamen
                          ? informeExamen.evaluadores_relacion.map(
                              (actividad, index) => (
                                <TableRow key={index}>
                                  <TableCell align="center">
                                    {actividad}
                                  </TableCell>
                                  <TableCell align="center">
                                    {evaluadores.map((evaluador) =>
                                      evaluador.id === actividad
                                        ? evaluador.nombre_evaluador
                                        : null
                                    )}
                                  </TableCell>
                                </TableRow>
                              )
                            )
                          : null}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div>
                  <h1>Grafico General:</h1>
                  <Chart
                    width={"600px"}
                    height={"400px"}
                    chartType="PieChart"
                    loader={<div>Cargando Grafico</div>}
                    data={[["Actividad", "Calificaciones"]].concat(
                      Object.entries(graficaGeneral).map(
                        ([calificacion, value]) => [calificacion, value]
                      )
                    )}
                    options={{
                      chart: {
                        title: "Promedio de calificaciones",
                      },
                      slices: coloresFondoPastel(Object.keys(graficaGeneral)),
                    }}
                    rootProps={{ "data-testid": "1" }}
                  />
                </div>
                <div>
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
                              ...Object.entries(categorias).map(
                                ([categoria, cantidad]) => [categoria, cantidad]
                              ),
                            ]}
                            options={{
                              title: `Gráfica Actividad ${actividad}`,
                              titleTextStyle: {
                                fontSize: 22,
                              },
                              slices: coloresFondoPastel(
                                Object.keys(categorias)
                              ),
                            }}
                            rootProps={{ "data-testid": "1" }}
                          />
                        </div>
                      )
                    )}
                  </div>
                  <div>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Observaciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {informeDatos ?
                            informeDatos.observaciones_calificaciones.map((informe, index) => (
                            informe.trim() !== '' &&
                              <TableRow key={index}>
                                  <TableCell>
                                      {informe}
                                  </TableCell>
                              </TableRow>
                          )) : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </div>
          <DialogActions sx={{ background: "rgba( 0, 0, 0 , 0.2)" }}>
            <Button onClick={cerrarInforme} color="primary">
              Cerrar
            </Button>
            <Button onClick={descargarPDF}>Descargar Informe</Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};
