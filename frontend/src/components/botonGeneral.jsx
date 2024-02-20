import { Button } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload'

export const BotonGeneral = ({camposCargados, tipo, accion }) => {
  return (
    <>
      <Button 
        variant="contained" 
        disabled={!camposCargados} 
        type={tipo}
      >
        <UploadIcon fontSize="small" style={{ margin: "0.3rem" }}/> 
        {accion}
      </Button>
    </>
  );
};
