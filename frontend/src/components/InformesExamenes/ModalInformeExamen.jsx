import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import informeServicio from "../../services/ServicioInforme";
import evaluadorService from "../../services/servicioEvaluador";
// import examenService from "../../services/ServiciosExamen";
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
  listaExamenes,
}) => {
  const informe = useSelector((state) => state.informeExamen.idInforme);
  const programa = useSelector((state) => state.programa.programa);
  console.log('programa', programa);
  
  console.log('mi informe: ', listaExamenes);
  

  const [graficaGeneral, setGraficaGeneral] = useState([]);
  const [graficaActividades, setGraficaActividades] = useState([]);
  const [colorInforme, setColorInforme] = useState([]);
  // const [listaExamenes, setListaExamenes] = useState([]);
  // console.log('lista de examenes', listaExamenes);
  const [evaluadores, setEvaluadores] = useState([]);
  
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
  }, [informe]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       if (programa) {
  //         const examenes = await examenService.ExamenesCreados(programa);
  //         console.log('examenes', examenes);
          
  //         setListaExamenes(examenes);
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener la lista: ", error);
  //     }
  //   }
  //   fetchData();
  // }, [programa]);

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
        <div>
          <DialogTitle sx={{ background: "rgba( 0, 0, 0 , 0.2)" }}>
            Informe Examen
          </DialogTitle>
          <div id="pdf-content">
            <DialogContent>
              <DialogContentText sx={{ color: 'black' }}>
                <div style={{ maxWidth: "100%", height: '10rem', width: '42rem' }}>
                  <p style={{ height: '62%', margin: '0 auto', fontSize: '14px', fontWeight: 'bold', textAlign: "center" }}>
                    {informeDatos ? informeDatos.proyecto_integrador : null}
                  </p>
                  <p style={{ height: '11%', margin: '0 auto', fontSize: '14px', fontWeight: 'bold' }}>
                    {informeDatos ? informeDatos.resultado_aprendizaje_nombre : null}
                  </p>
                  <p style={{ height: '27%', margin: '0 auto', fontSize: '12px' }}>
                    {informeDatos ? informeDatos.resultado_aprendizaje_descripcion : null}
                  </p>
                </div>
                <div style={{ height: '36rem', width: '42rem', marginTop: '0.5rem', display: "flex", alignItems: "center" }}>
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
                        {informeDatos
                          ? informeDatos.actividades_formativas.map(
                              (actividad, index) => (
                                <TableRow key={index}>
                                  <TableCell align="center">
                                    <p 
                                      style={{ fontSize: '11.5px', margin: '0 auto'}}
                                    >
                                      {actividad}
                                    </p>
                                  </TableCell>
                                </TableRow>
                              )
                            )
                          : null}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div style={{ height: '18rem', width: '42rem', marginTop: '0.5rem' }}>
                  <TableContainer className="tablas">
                    <Table>
                      <TableHead className="tablaEncabezado">
                        <TableRow>
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
                                    <p 
                                      style={{ fontSize: '11.5px', margin: '0 auto' }}
                                    >
                                    {evaluadores.map((evaluador) =>
                                      evaluador.id === actividad
                                        ? evaluador.nombre_evaluador
                                        : null
                                    )}
                                    </p>
                                  </TableCell>
                                </TableRow>
                              )
                            )
                          : null}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div style={{  width: '42rem', display: "flex", flexDirection: "column" }}>
                  <div>
                    <h2 
                      style={{ margin: '0 auto', textAlign: "center", height: '3.2rem' }}
                    >
                      Grafico General</h2>
                  </div>
                  <div style={{ margin: '0 auto' }}>
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
                </div>
                <hr />
                <div style={{ width: '42rem', marginTop: '1rem' }}>
                  <div>
                    <h2 
                      style={{ margin: '0 auto', textAlign: "center", height: '1.1rem'}}
                    >
                      Graficos Por Actividades</h2>
                  </div>
                  <div style={{ margin: '2rem 0.5rem 0rem 0.5rem', width: '97%' , display: 'grid', justifyContent: "center" }}>
                    {Object.entries(graficaActividades).map(
                      ([actividad, categorias], index) => (
                        <div key={actividad} style={{ width: '32rem', marginTop: '3.5rem' }}>
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
                </div>
                <div style={{ marginTop: '2rem' }}>
                  <TableContainer className="tablas">
                    <Table>
                      <TableHead className="tablaEncabezado">
                        <TableRow>
                          <TableCell align="center">Observaciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="tablasCuerpo">
                        {informeDatos ?
                          informeDatos.observaciones_calificaciones.map((informe, index) => (
                          informe.trim() !== '' &&
                            <TableRow key={index}>
                                <TableCell align="center">
                                  <p
                                    style={{ fontSize: '11.5px', margin: '0 auto'}}
                                  >
                                    {informe}
                                  </p>
                                </TableCell>
                            </TableRow>
                        )) : null}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
