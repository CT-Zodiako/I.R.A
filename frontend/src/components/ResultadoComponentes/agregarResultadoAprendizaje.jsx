import { useState } from "react";
import resultadoAprendizajeServicio from "../../services/ServicioResultadoAprendizaje";
import { InputLabel, TextField } from "@mui/material";

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
      const response = await resultadoAprendizajeServicio.agregarResultado(
        agregaResultado
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Crear Resultado Aprendizaje</h1>
      <form onSubmit={onEnviarResultado}>
        <div>
          <div>
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
            {/* <input
              type="text"
              name="titulo"
              value={agregaResultado.titulo}
              onChange={onAgregarResultado}
              required
            /> */}
          </div>
          <div>
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
            {/* <input
              type="text"
              name="descripcion"
              value={agregaResultado.descripcion}
              onChange={onAgregarResultado}
              required
            /> */}
          </div>
        </div>
        <div>
          <button type="submit">Crear Evaluador</button>
        </div>
      </form>
    </div>
  );
};
