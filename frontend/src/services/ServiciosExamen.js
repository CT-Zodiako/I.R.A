import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

class examenService{
    async agregarExamen (formularioExamen) {
      try {
        const response = await api.post('/examen/crear_examen', formularioExamen);
        console.log('Respuesta del servidor:', response.data);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    }
  };

export default new examenService();