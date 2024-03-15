import { useState } from "react"
import EmailIcon from '@mui/icons-material/Email'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import { 
  Table, TableBody, TableCell, 
  TableContainer, TableHead, 
  TablePagination, TableRow 
} from "@mui/material";

export const TablaGeneral = ({ datos, editar, eliminar, enviarCorre }) => {
  const [paginasTabla, setPaginasTabla] = useState(0);
  const [filasPaginasTabla, setFilasPaginasTabla] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPaginasTabla(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setFilasPaginasTabla(parseInt(event.target.value, 10));
    setPaginasTabla(0);
  };

  return (
    <>
        <TableContainer className="tablas">
          <Table aria-label="caption table">
            <TableHead className="tablaEncabezado">
              <TableRow>
                <TableCell className="bordeVerticar" align="center" sx={{width:"13%"}}>EXAMEN ID</TableCell>
                <TableCell className="bordeVerticar" align="center" sx={{width:"42%"}}>PROYECTO INTEGRADOR</TableCell>
                <TableCell className="bordeVerticar" align="center" sx={{width: "20%"}}>EVALUADORES</TableCell>
                <TableCell align="center" sx={{width: "25%"}}>ACCIÓN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {(filasPaginasTabla > 0
                  ? datos.slice(paginasTabla * filasPaginasTabla, paginasTabla * filasPaginasTabla + filasPaginasTabla)
                  : datos
                ).map((dato) => (
                  <TableRow key={dato.id}>
                    <TableCell scope="row" align="center" className=" bordeVerticar">
                      {dato.id}
                    </TableCell>
                    <TableCell align="center" className=" bordeVerticar">
                      {dato.proyecto_integrador}
                    </TableCell>
                    <TableCell align="center" className=" bordeVerticar">
                      {dato.nombres_evaluadores
                        .map((evaluador, index) => (
                          <div key={index} style={{ margin: "0.6rem 0rem" }}>
                            {evaluador}
                          </div>
                        ))
                      }
                    </TableCell>
                    <TableCell align="center">
                      <div>
                        <CreateIcon
                          className="colorEditar"
                          fontSize="large"
                          onClick={() => editar({accion:'editar', examenId: dato.id})}
                        />
                        <DeleteIcon
                          className="colorEliminar"
                          fontSize="large"
                          onClick={(event) => eliminar(event, dato.id)}
                        />
                        <EmailIcon
                            color="primary"
                            fontSize="large"
                            onClick={(event) => enviarCorre(event, dato.id)}
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
          count={datos.length}
          rowsPerPage={filasPaginasTabla}
          page={paginasTabla}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>
  );
};
