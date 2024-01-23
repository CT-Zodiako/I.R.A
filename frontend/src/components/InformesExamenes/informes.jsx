import { useEffect, useState } from "react"
import informeServicio from "../../services/ServicioInforme"
import { useNavigate } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material"

export const Informes = () => {
  const navigate = useNavigate();
  const [calificacionesExamen, setCalificacionesExamen] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead sx={{ background: "rgba(0, 0, 255, 0.5)" }}>
            <TableRow>
              <TableCell>Examen Id</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(rowsPerPage > 0
                  ? calificacionesExamen.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : calificacionesExamen
                ).map((informes) => (
              <TableRow key={informes.id}>
                <TableCell scope="row" align="left">
                  {informes.id}
                </TableCell>
                <TableCell align="left">
                  {informes.proyecto_integrador}
                </TableCell>
                <TableCell align="left">
                  <button onClick={() => verInforme(informes.id, informes.proyecto_integrador)}>
                    Ver Informe
                  </button>
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
