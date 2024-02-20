import { useState } from "react";
import resultadoAprendizajeServicio from "../../services/ServicioResultadoAprendizaje";
import {
  Box,
  Button,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

export const CrearResultadoAprendizaje = ({ abierto, cerrado }) => {
  const [agregaResultado, setAgregaResultado] = useState({
    titulo: "",
    descripcion: "",
  });

  const onAgregarResultado = (event) => {
    const { name, value } = event.target;
    setAgregaResultado({
      ...agregaResultado,
      [name]: value,
    });
  };

  const onEnviarResultado = async (event) => {
    event.preventDefault();
    try {
      await resultadoAprendizajeServicio.agregarResultado(agregaResultado);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        open={abierto}
        onClose={cerrado}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <div className="modales">
            <form onSubmit={onEnviarResultado}>
              <div className="componentes">
                <div className="centrar">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Crear Resultado de Aprendizaje
                  </Typography>
                </div>
                <div className="centrar">
                  <InputLabel id="demo-simple--label">Titulo: </InputLabel>
                  <TextField
                    type="text"
                    name="titulo"
                    value={agregaResultado.titulo}
                    onChange={onAgregarResultado}
                    id="outlined-basic"
                    label="titulo"
                    required
                  />
                </div>
                <div className="centrar">
                  <InputLabel id="demo-simple--label">Descripcion: </InputLabel>
                  <TextField
                    type="text"
                    name="descripcion"
                    value={agregaResultado.descripcion}
                    onChange={onAgregarResultado}
                    id="outlined-basic"
                    label="descripcion"
                    required
                  />
                </div>
              </div>
              <div className="centrar">
                <Button 
                  type="submit" 
                  variant="contained"
                >
                  Crear
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
