import axios from 'axios';

class loginService {
  async verificarLogin(autentificacion) {
    try {
      const response = await axios.post('http://127.0.0.1:3001/login/conectar', autentificacion);
      return response.data.data;
    } catch (error) { 
      console.error('Error al enviar los datos:', error);
      throw error; 
    }
  }
}

export default new loginService();
