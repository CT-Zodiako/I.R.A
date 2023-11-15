export const TablaGeneral = ({columnas, datos}) => {
  return (
    <>
      <div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead sx={{ background: "rgba(0, 0, 255, 0.5)" }}>
            {columnas.map((columna, index) => (
                <TableRow key={index}>
                    <TableCell>{columna.nombre}</TableCell>
              </TableRow>
            ))}
            </TableHead>
            <TableBody>
              {datos.map((informes) => (
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
    </>
  );
};
