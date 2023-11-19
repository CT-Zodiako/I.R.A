import { Button } from "@mui/material";

export const BotonGeneral = ({siguiente, tipo, accion}) => {
  return (
    <>
      <Button variant="contained" disable={siguiente} type={tipo}>{accion}</Button>
    </>
  );
};
