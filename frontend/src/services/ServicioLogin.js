import axios from 'axios';

class loginService {
  async verificarLogin(autentificacion) {
    try {
      console.log(import.meta.env.VITE_API_URL);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login/conectar`, autentificacion);
      return response;
    } catch (error) { 
      console.error('Error al enviar los datos:', error);
      throw error; 
    }
  }
}

export default new loginService();
