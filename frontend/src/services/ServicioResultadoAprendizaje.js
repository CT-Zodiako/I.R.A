import axios from 'axios';

class resultadoAprendizajeServicio{
  async agregarResultado (agregaResultado) {
    try {
      const response = await axios.post('http://127.0.0.1:3001/resultado_aprendizaje/crear_resultado', agregaResultado);
      return response.data;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }
  
  async traerResultado() {
    try {
      const response = await axios.get('http://127.0.0.1:3001/resultado_aprendizaje/traer_resultados');
      return response.data.data;
    } catch (err) {
      console.error(err);
    }
  }
}

export default new resultadoAprendizajeServicio();