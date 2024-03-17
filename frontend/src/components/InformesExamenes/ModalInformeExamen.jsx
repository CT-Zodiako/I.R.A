import { useEffect, useState, useRef } from "react";
import Chart from "react-google-charts";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import html2pdf from "html2pdf.js";
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

export const ModalInformeExamen = ({ abrirInforme, cerrarInforme, descargarPDF }) => {
  const evaluador = useSelector((state) => state.informeExamen.idInforme);
  
  const [informacionCalificaciones, setInformacionCalificaciones] = useState([]);
  console.log('Estado de calificaciones: ', informacionCalificaciones);
  const [promedioGeneral, setPromedioGeneral] = useState([]);
  console.log('Estado de promedioGrafica: ', promedioGeneral);
  const [actividadesDecripcion, setActividadesDescripcion] = useState([]);
  console.log('Estado de actividades: ', actividadesDecripcion);
  const [colorInforme, setColorInforme] = useState([]);  
  console.log('Estado de colorInforme: ', colorInforme);
  

  useEffect(() => {
    async function fetchData() {
      try {
        if(evaluador){
          const data = await informeServicio.promedioActividades(evaluador);
          setInformacionCalificaciones(data);
        }
      } catch (error) {
        console.error(
          "Error al obtener el promedio de los estudiantes:",
          error
        );
      }
    }
    fetchData();
  }, [evaluador]);

  useEffect(() => {
    async function fetchData() {
      try {
        if(evaluador){
          const data = await informeServicio.promedioGraficaGeneral(evaluador);
          setPromedioGeneral(data);
        }
        console.log("graficas actividad: ", data);
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
        <DialogTitle sx={{ background: "rgba( 0, 0, 0 , 0.2)" }}>
          Informe Examen
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
        </DialogContent>
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
