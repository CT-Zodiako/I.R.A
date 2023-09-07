import axios from 'axios';

class resultadoAprendizajeServicio{
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