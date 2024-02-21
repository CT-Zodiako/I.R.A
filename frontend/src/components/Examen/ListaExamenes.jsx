import { useEffect, useState } from "react"
import examenService from "../../services/ServiciosExamen"
import {
  Button, Table, TableBody,
  TableCell, TableContainer,
  TableHead, TablePagination,
  TableRow
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EmailIcon from '@mui/icons-material/Email'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'

export const ExamenesLista = () => {  
  const navigate = useNavigate();

  const [listaExamenes, setListaExamenes] = useState([]);
  const [paginasTabla, setPaginasTabla] = useState(0);
  const [filasPaginasTabla, setFilasPaginasTabla] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPaginasTabla(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setFilasPaginasTabla(parseInt(event.target.value, 10));
    setPaginasTabla(0);
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
        <div className="componentes">
          <div>
            <Button
              variant="contained"
              color="success"
              size="small"
            >
              <AddCircleOutlineIcon fontSize="small" />
              <Link 
                to="/pasos" 
                className="botonAgregar"
              >
                Crear Examen
              </Link>
            </Button>
          </div>
          <div>
            <TableContainer className="tablas">
              <Table aria-label="caption table">
                <TableHead className="tablaEncabezado">
                  <TableRow>
                    <TableCell align="center">Examen Id</TableCell>
                    <TableCell align="center">Proyecto Integrador</TableCell>
                    <TableCell align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {(filasPaginasTabla > 0
                  ? listaExamenes.slice(paginasTabla * filasPaginasTabla, paginasTabla * filasPaginasTabla + filasPaginasTabla)
                  : listaExamenes
                ).map((examen) => (
                    <TableRow key={examen.id} className="tablaBody">
                      <TableCell scope="row" align="center" className="tablaId">
                        {examen.id}
                      </TableCell>
                      <TableCell align="center" className="tablaProyecto">
                        <div>
                          {examen.proyecto_integrador}
                        </div>
                      </TableCell>
                      <TableCell className="tablaAcciones">
                        <div>
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
                              color="primary"
                              fontSize="large"
                              onClick={(event) => enviarCorre(event, examen.id)}
                          />
                        </div>
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
              rowsPerPage={filasPaginasTabla}
              page={paginasTabla}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
