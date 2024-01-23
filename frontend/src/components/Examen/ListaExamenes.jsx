import { useEffect, useState } from "react";
import examenService from "../../services/ServiciosExamen";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const ExamenesLista = () => {
  const [listaExamenes, setListaExamenes] = useState([]);

  console.log("mis examenes: ", listaExamenes);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await examenService.ExamenesCreados();
        setListaExamenes(data.data);
      } catch (error) {
        console.error("Error al obtener la lista: ", error);
      }
    }
    fetchData();
  }, []);

  const enviarCorre = (examenId) => {
    const fetchData = async () => {
      try {
        const data = await examenService.correoEvaluadores(examenId);
        console.log("Correo enviado correctamente");
      } catch (error) {
        console.error("Error al enviar los correos: ", error);
      }
    };

    fetchData();
  };

  return (
    <>
      <div>
        <div>
          <h1>Lista Examenes Creados</h1>
        </div>
        <div>
          <div>
            <h3>examenes</h3>
          </div>
          <div>
            <button>Crear Examen</button>
          </div>
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
                  {listaExamenes.map((examen) => (
                    <TableRow key={examen.id}>
                      <TableCell scope="row" align="left">
                        {examen.id}
                      </TableCell>
                      <TableCell align="left">
                        {examen.proyecto_integrador}
                      </TableCell>
                      <TableCell align="left">
                        <Button onClick={() => enviarCorre(examen.id)}>
                          Notificar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};
