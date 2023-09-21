import { useState } from 'react';
import resultadoAprendizajeServicio from '../../services/ServicioResultadoAprendizaje';

export const CrearResultado = () => {
  const [agregaResultado, setAgregaResultado] = useState({
    titulo: '',
    descripcion: '',
    estado: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgregaResultado({
      ...agregaResultado,
      [name]: value
    });
  };

  const onEnviarResultado = async (e) => {
    e.preventDefault();
    try {
      const response = await resultadoAprendizajeServicio.agregarResultado(agregaResultado);
      console.log(response);
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
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>descripcion:</label>
          <input
            type="text"
            name="descripcion"
            value={agregaResultado.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            name="estado"
            value={agregaResultado.estado}
            onChange={handleChange}
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

