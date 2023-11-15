import { useEffect, useState } from "react";
import informeServicio from "../../services/ServicioInforme";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const Informes = () => {
  const [calificacionesExamen, setCalificacionesExamen] = useState([]);

  console.log("calificaciones examenes: ", calificacionesExamen);

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

  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead sx={{background: 'blue'}}>
            <TableRow>
              <TableCell>Examen Id</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calificacionesExamen.map((informes) => (
              <TableRow key={informes.id}>
                <TableCell scope="row" align="left">
                  {informes.id}
                </TableCell>
                <TableCell align="left">
                  {informes.proyecto_integrador}
                </TableCell>
                <TableCell align="left">
                  <button>
                    <Link
                      to={`/informe-estudiante/${informes.id}/${informes.proyecto_integrador}`}
                    >
                      Ver Informe
                    </Link>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
