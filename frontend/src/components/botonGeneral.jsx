import { Button } from "@mui/material";

export const BotonGeneral = ({camposCargados, tipo, accion}) => {
  return (
    <>
      <Button variant="contained" disabled={!camposCargados} type={tipo}>{accion}</Button>
    </>
  );
};
