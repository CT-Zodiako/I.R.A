import axios from 'axios';

class resultadoAprendizajeServicio {
  async agregarResultado(agregaResultado) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/resultado_aprendizaje/crear_resultado`, agregaResultado);
      return response.data;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }

  async traerResultado() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/resultado_aprendizaje/traer_resultados`);
      return response.data.data;
    } catch (err) {
      console.error(err);
    }
  }
  async traerResultadoByEstado() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/resultado_aprendizaje/traerResultadoByEstado`);
      return response.data.data;
    } catch (err) {
      console.error(err);
    }
  }

  async cambiarEstado(resultado_id) {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/resultado_aprendizaje/cambiar_estado_resultado/${resultado_id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
}


export default new resultadoAprendizajeServicio();