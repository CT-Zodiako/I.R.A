import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

class evaluadorService{
    async agregarEvaluador (formData) {
      try {
        const response = await api.post('/evaluador/agregar_evaluador', formData);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  };

export default new evaluadorService();