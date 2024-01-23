import { useState } from "react";
import resultadoAprendizajeServicio from "../../services/ServicioResultadoAprendizaje";
import { Button, InputLabel, TextField } from "@mui/material";

export const CrearResultado = () => {
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
    <div className="informacion">
      <h1>Crear Resultado Aprendizaje</h1>
      <form onSubmit={onEnviarResultado}>
        <div className="componentes">
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
            variant="outlined"
            size="small"
          >
            Crear Evaluador
          </Button>
          {/* <button type="submit">Crear Evaluador</button> */}
        </div>
      </form>
    </div>
  );
};
