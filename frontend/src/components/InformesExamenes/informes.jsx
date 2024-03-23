import { useEffect, useState } from "react"
import informeServicio from "../../services/ServicioInforme"
import { useNavigate,  } from "react-router-dom"
import { TextField } from "@mui/material"
import examenService from "../../services/ServiciosExamen";
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ModalInformeExamen } from "./ModalInformeExamen"
import { useDispatch, useSelector } from "react-redux"
import { guardarInformeId } from "../../redux/idExamenInforme"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import html2pdf from "html2pdf.js"
import { Tabla } from "../tabla"

export const Informes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const programa = useSelector((state) => state.programa.programa);

  const [calificacionesExamen, setCalificacionesExamen] = useState([]);
  console.log('calificaciones de los informes', calificacionesExamen);
  const [listaExamenes, setListaExamenes] = useState([]);
  console.log('lista de examenes componete: ', listaExamenes);
  

  const [filtrar, setFiltrar] = useState('');
  const [mostrarInforme, setMotrarInforme] = useState(false);

  const columnas = [
    {
      titulo: "INFORME ID",
      ancho: "25%",
      valor: "id",
    },
    {
      titulo: "PROYECTO INTEGRADOR",
      ancho: "45%",
      valor: "proyecto_integrador",
    },
  ];

  const BotonesAcciones = [
    {
      icono: RemoveRedEyeIcon,
      color: () => 'colorInforme',
      accion: (event, informes) => abrirInforme(informes),
    },
  ];

  const buscarInforme = (event) => {
    setFiltrar(event.target.value);
  };

  const filtrarInformeExamen = calificacionesExamen.filter((informe) => 
    informe.proyecto_integrador.toLowerCase().includes(filtrar.toLowerCase())
  );

  const abrirInforme = (informes) => {
    dispatch(
      guardarInformeId({
        idExamen: informes 
      })
    );
    setMotrarInforme(true);
  }

  const cerrarInforme = () => {
    setMotrarInforme(false);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (programa) {
          const examenes = await examenService.ExamenesCreados(programa);
          console.log('examenes', examenes);
          setListaExamenes(examenes);
        }
      } catch (error) {
        console.error("Error al obtener la lista: ", error);
      }
    }
    fetchData();
  }, [programa]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (programa) {
          const data = await informeServicio.informeExamen(programa);
          console.log('estos son los informes de los examenes ya calificaciones: ');
          setCalificacionesExamen(data);
        }
      } catch (error) {
        console.error("Error al obtener la lista de examenes:", error);
      }
    }
    fetchData();
  }, [programa]);

  const downloadPDF = () => {
    const input = document.getElementById("pdf-content");

    html2pdf(input, {
      margin: 10,
      filename: "download.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    html2canvas(input).then((canvas) => {
      const contentHeight = canvas.height;
      const pageHeight = pdfHeight;
      let currentPosition = 0;

      while (currentPosition < contentHeight) {
        const sectionHeight = Math.min(
          pageHeight,
          contentHeight - currentPosition
        );
        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(
          imgData,
          "PNG",
          0,
          currentPosition,
          pdfWidth,
          sectionHeight
        );
        currentPosition += sectionHeight;

        if (currentPosition < contentHeight) {
          pdf.addPage();
        }
      }
      pdf.save("download.pdf");
    });
  };

  return (
    <div>
      <div className="cabecera">
        <h1>Examenes informe</h1>
      </div>
      <div className="cuerpo">
        <TextField
          sx={{ width: "24rem", marginLeft: "12rem"}}
          id="outlined-basic"
          placeholder="Filtrar Informe"
          value={filtrar}
          onChange={ buscarInforme }
          InputProps={{
            startAdornment:(
              <FilterAltIcon
                sx={{ color: "rgba(0, 0, 0, 0.25)" }}/>
            ),
          }}
        />
      </div>
      <div className="tablascontenido">
        <Tabla
          datos={filtrarInformeExamen}
          columnas={columnas}
          acciones={BotonesAcciones}
          accinar="true"
        />
      </div>
      <ModalInformeExamen
        abrirInforme={mostrarInforme}
        cerrarInforme={cerrarInforme}
        descargarPDF={downloadPDF}
        datosInforme={calificacionesExamen}
        listaExamenes={listaExamenes}
      />
    </div>
  );
};
