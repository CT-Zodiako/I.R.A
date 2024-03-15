import { useState } from "react"
import { 
  Table, TableBody, TableCell, 
  TableContainer, TableHead, 
  TablePagination, TableRow 
} from "@mui/material"

export const Tabla = ({ datos, columnas, acciones, accinar }) => {
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
              {columnas.map((columna, index) => (
                  <TableCell className=" bordeVerticar" align="center" style={{ width: columna.ancho }} key={index}>{columna.titulo}</TableCell> 
              ))}
              {accinar && <TableCell className="bordeVerticar" sx={{ fontSize: '14px' }} align="center">ACCION</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody className="tablasCuerpo">
            {(filasPaginasTabla > 0
                  ? datos.slice(paginasTabla * filasPaginasTabla, paginasTabla * filasPaginasTabla + filasPaginasTabla)
                  : datos
                ).map((dato) => (
                  <TableRow key={dato.id}>
                  {columnas.map((columna, index) => (
                    <TableCell align="center" className=" bordeVerticar" key={index}>
                      {columna.valor === 'estado' ? (dato[columna.valor] ? 'Activo' : 'Inactivo') : dato[columna.valor]}
                    </TableCell>
                  ))}
                  {accinar &&
                    <TableCell align="center">
                    {acciones.map((accion, index) => (
                      <accion.icono
                        // style={{ color: accion.color(dato) }}
                        // className={accion.color}
                        className={accion.color ? accion.color(dato) : ''}
                        fontSize="large"
                        onClick={(event) => accion.accion(event, dato.id)}
                      />
                    ))}
                    </TableCell>
                  }
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
