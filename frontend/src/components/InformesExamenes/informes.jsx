import { useEffect, useState } from "react";
import informeServicio from "../../services/ServicioInforme";
import { useNavigate } from "react-router-dom";
// import { TablaGeneral } from "../tablaGeneral";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const Informes = () => {
  const navigate = useNavigate();
  const [calificacionesExamen, setCalificacionesExamen] = useState([]);

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
            {calificacionesExamen.map((informes) => (
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
    </div>
  );
};
