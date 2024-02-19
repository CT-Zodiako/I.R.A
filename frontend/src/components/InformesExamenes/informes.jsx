import { useEffect, useState } from "react"
import informeServicio from "../../services/ServicioInforme"
import { useNavigate } from "react-router-dom"
import {
  Button, Table, TableBody,
  TableCell, TableContainer,
  TableHead, TablePagination,
  TableRow,
  TextField
} from "@mui/material"
import FilterAltIcon from '@mui/icons-material/FilterAlt'

export const Informes = () => {
  const navigate = useNavigate();
  const [calificacionesExamen, setCalificacionesExamen] = useState([]);
  console.log("lista de los informes: ",calificacionesExamen);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filtrar, setFiltrar] = useState('');

  const buscarInforme = (event) => {
    setFiltrar(event.target.value);
  };

  const filtrarInformeExamen = calificacionesExamen.filter((informe) => 
    informe.proyecto_integrador.toLowerCase().includes(filtrar.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const verInforme = (id, proyectoIntegrador) => {
    navigate(`/informe-estudiante`, {
      state: {
        evaluadorId: id,
        proyectoIntegrador: proyectoIntegrador,
      },
    });
  };

  return (
    <div>
      <h1>Examenes imforme</h1>
      <div>
        <TextField
          sx={{ width: "24rem", marginLeft: "12rem"}}
          id="outlined-basic"
          placeholder="Filtrar por Informe Examen"
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
      <TableContainer className="tablas">
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead className="tablaEncabezado">
            <TableRow>
              <TableCell align="center">Examen Id</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(rowsPerPage > 0
                  ? filtrarInformeExamen.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                    onClick={() => verInforme(informes.id, informes.proyecto_integrador)}
                  >
                    Ver Informe
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
        rowsPerPage={rowsPerPage}
        count={calificacionesExamen.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
