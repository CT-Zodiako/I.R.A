import { useEffect, useState } from "react"
import informeServicio from "../../services/ServicioInforme"
import { useNavigate,  } from "react-router-dom"
import { TextField, 
  Table, TableBody, TableCell, 
  TableContainer, TableHead, 
  TablePagination, TableRow, Button
} from "@mui/material"
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
  // const programa = useSelector((state) => state.programa.programa);

  // const [paginasTabla, setPaginasTabla] = useState(0);
  // const [filasPaginasTabla, setFilasPaginasTabla] = useState(5);

  // const handleChangePage = (event, newPage) => {
  //   setPaginasTabla(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setFilasPaginasTabla(parseInt(event.target.value, 10));
  //   setPaginasTabla(0);
  // };
  // ...
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [calificacionesExamen, setCalificacionesExamen] = useState([]);
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
    console.log('abrir informe', informes);
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
        const data = await informeServicio.informeExamen();
        setCalificacionesExamen(data);
        console.log(data);
      } catch (error) {
        console.error("Error al obtener la lista de examenes:", error);
      }
    }
    fetchData();
  }, []);

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
        <h1>Examenes imforme</h1>
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
      {/* <TableContainer className="tablas">
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead className="tablaEncabezado">
            <TableRow>
              <TableCell align="center">Examen Id</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(filasPaginasTabla > 0
                  ? filtrarInformeExamen.slice(paginasTabla * filasPaginasTabla, paginasTabla * filasPaginasTabla + filasPaginasTabla)
                  : filtrarInformeExamen
                ).map((informes) => (
              <TableRow key={informes.id}>
                <TableCell scope="row" align="center" className="informeId">
                  {informes.id}
                </TableCell>
                <TableCell align="left" className="informeProyecto">
                  <div>
                    {informes.proyecto_integrador}
                  </div>
                </TableCell>
                <TableCell align="center" className="infomeAccion">
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                  >
                    Descargar
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => abrirInforme( informes.id)}
                  >
                    ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        rowsPerPage={filasPaginasTabla}
        count={filtrarInformeExamen.length}
        page={paginasTabla}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
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
      />
    </div>
  );
};
