import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

class examenService{
    async agregarExamen (formularioExamen) {
      try {
        return await api.post('/examen/crear_examen', formularioExamen);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    }

    async ExamenesCreados () {
      try{
          const responce = await axios.get('http://127.0.0.1:3001/examen/examenes');
          return responce;
      } catch (error) {
        console.error("Error al traer la lista de examenes: ", error)
      }
    }

    async correoEvaluadores (examenId) {
      try{
          const responce = await axios.post('http://127.0.0.1:3001/email/enviar_correo', {
            examen_id: examenId
          });
      } catch (error) {
        console.error("Error al enviar los correos: ", error);
      }
    } 
    
    async cambiarEstado (examenId) {
      try{
          await axios.put(`http://127.0.0.1:3001/email/cambiar_estado_resultado/${examenId}`);
      } catch (error) {
        console.error("El estado no se puedo cambiar: ",error);
      }
    }
  };

export default new examenService();