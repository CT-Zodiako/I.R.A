import { useEffect, useState } from "react";
import examenService from "../../services/ServiciosExamen";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import EmailIcon from '@mui/icons-material/Email'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'

export const ExamenesLista = () => {
  const [listaExamenes, setListaExamenes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

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
        const examenes = await examenService.ExamenesCreados();
        setListaExamenes(examenes)
      } catch (error) {
        console.error("Error al obtener la lista: ", error);
      }
    }
    fetchData();
  }, []);

  const enviarCorre = (event, examenId) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        await examenService.correoEvaluadores(examenId);
        await examenService.cambiarEstado(examenId);
        onActualizarLista();
      } catch (error) {
        console.error("Error al enviar los correos: ", error);
      }
    };
    fetchData();
  };

  const onEliminarExamen = async (event, examenId) => {
    event.preventDefault();
    try {
      await examenService.eliminarExamen(examenId);
      const nuevaListaExamen = await examenService.ExamenesCreados();
      setListaExamenes(nuevaListaExamen);
    } catch (error) {
      console.error(error);
    }
  };

  const onActualizarLista = async () => {
    try {
      const actualizar = await examenService.ExamenesCreados();
      setListaExamenes(actualizar);
    } catch (error) {
      console.error("Erro al actulizar la tabla:", error);
    }
  }

  const onEditarExamen = ({accion, examenId}) => {
    console.log("quiero editar: ", accion);
    console.log("Id examen editar: ", examenId)
    navigate(`/editar_examen`,{
      state: {
        accion: accion,
        examenId: examenId
      }
    });
  }  

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
            <Button
              variant="contained"
              color="success"
              size="small"
            >
              <Link to="/pasos" style={{ textDecoration: 'none', color: 'white' }}>Crear Examen</Link>
            </Button>
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
                {(rowsPerPage > 0
                  ? listaExamenes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : listaExamenes
                ).map((examen) => (
                    <TableRow key={examen.id}>
                      <TableCell scope="row" align="left">
                        {examen.id}
                      </TableCell>
                      <TableCell align="left">
                        {examen.proyecto_integrador}
                      </TableCell>
                      <TableCell align="left">
                        <CreateIcon
                          className="colorEditar"
                          fontSize="large"
                          onClick={() => onEditarExamen({accion:'editar', examenId: examen.id})}
                        />
                        <DeleteIcon
                          className="colorEliminar"
                          fontSize="large"
                          onClick={(event) => onEliminarExamen(event, examen.id)}
                        />
                        <EmailIcon
                            style={{ cursor: examen.estado ? 'not-allowed' : 'pointer' }}
                            color="primary"
                            fontSize="large"
                            onClick={(event) => enviarCorre(event, examen.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={listaExamenes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </div>
        </div>
      </div>
    </>
  );
};
