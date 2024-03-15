import { useState } from 'react'
import { 
    Table, TableBody, TableCell, 
    TableContainer, TableHead, 
    TablePagination, TableRow 
} from '@mui/material';
 
export const TablaEvaluadores = ({ datos, editar, eliminar }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return(
    <>
        <TableContainer className="tablas">
            <Table aria-label="caption table">
              <TableHead className="tablaEncabezado">
                <TableRow>
                  <TableCell className='bordeVerticar' align='center' style={{ width: '24%' }}>Nombre del Evaluador</TableCell>
                  <TableCell className='bordeVerticar' align='center' style={{ width: '24%' }}>Correo</TableCell>
                  <TableCell className='bordeVerticar' align='center' style={{ width: '14%' }}>Telefono</TableCell>
                  <TableCell className='bordeVerticar' align='center' style={{ width: '14%' }}>Numero de Identificacion</TableCell>
                  <TableCell className='bordeVerticar' align='center' style={{ width: '10%' }}>Estado</TableCell>
                  <TableCell align='center' style={{ width: '14%' }}>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {(rowsPerPage > 0
                  ? datos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : datos
                ).map((dato) => (
                  <TableRow key={dato.id}>
                    <TableCell scope="row" align="left" className="bordeVerticar">
                      {dato.nombre_evaluador}
                    </TableCell>
                    <TableCell align="left" className="bordeVerticar">
                      {dato.correo}
                    </TableCell>
                    <TableCell align="center" className="bordeVerticar">
                      {dato.telefono}
                    </TableCell>
                    <TableCell align="center" className="bordeVerticar">
                      {dato.numero_identificacion}
                    </TableCell>
                    <TableCell align="center" className="bordeVerticar">                                          
                      {dato.estado ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell align="center">
                        <div>
                          <ClearIcon 
                            className="colorEliminar"
                            fontSize="large"
                            onClick={(event) =>
                                eliminar(event, dato.id)
                              }
                          />
                          <CreateIcon
                            className="colorEditar"
                            fontSize="large"
                            onClick={() => editar(dato.id)}
                          />
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            count={datos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
    </>
  )
};