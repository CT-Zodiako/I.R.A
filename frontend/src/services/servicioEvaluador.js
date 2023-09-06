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
  };

export default new evaluadorService();