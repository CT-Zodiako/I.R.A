import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

class examenService{
    async agregarExamen (formularioExamen) {
      try {
        // const token = localStorage.getItem('token')
        return await api.post('/examen/crear_examen', formularioExamen);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    }
  };

export default new examenService();