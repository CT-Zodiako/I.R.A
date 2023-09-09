import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

class evaluadorService{
  async agregarEvaluador (formulario) {
    try {
      const response = await api.post('/evaluador/agregar_evaluador', formulario);
      return response.data;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }

  async traerEvaluador() {
    try {
      const response = await axios.get('http://127.0.0.1:3001/evaluador/traer_evaluadores');
      return response.data;
    } catch (err) {
      console.error(err);
    }
    console.log(response);
  }
};

export default new evaluadorService();