import { useState } from 'react';
import resultadoAprendizajeServicio from '../../services/ServicioResultadoAprendizaje';

export const CrearResultado = () => {
  const [agregaResultado, setAgregaResultado] = useState({
    titulo: '',
    descripcion: ''
  });

  const onAgregarResultado = (event) => {
    const { name, value } = event.target;
    setAgregaResultado({
      ...agregaResultado,
      [name]: value
    });
  };

  const onEnviarResultado = async (event) => {
    event.preventDefault();
    try {
      const response = await resultadoAprendizajeServicio.agregarResultado(agregaResultado);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Crear Resultado Aprendizaje</h1>
      <form onSubmit={onEnviarResultado}>
        <div>
          <label>titulo:</label>
          <input
            type="text"
            name="titulo"
            value={agregaResultado.titulo}
            onChange={onAgregarResultado}
            required
          />
        </div>
        <div>
          <label>descripcion:</label>
          <input
            type="text"
            name="descripcion"
            value={agregaResultado.descripcion}
            onChange={onAgregarResultado}
            required
          />
        </div>
        <div>
          <button type="submit">Crear Evaluador</button>
        </div>
      </form>
    </div>
  );
}

