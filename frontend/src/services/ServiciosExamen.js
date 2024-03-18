import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

class examenService {
  async agregarExamen(formularioExamen) {
    try {
      return await axios.post(`${import.meta.env.VITE_API_URL}/examen/crear_examen`, formularioExamen);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }

  async ExamenesCreados(programa) {
    try {
      const responce = await axios.get(`${import.meta.env.VITE_API_URL}/examen/examenesBandejaAdmin/${programa}`);
      return responce.data;
    } catch (error) {
      console.error("Error al traer la lista de examenes: ", error)
    }
  }

  async eliminarExamen(examenId) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/examen/eliminar_examen/${examenId}`);
    } catch (error) {
      console.error("No se pudo eliminar el examen", error)
    }
  }

    async correoEvaluadores (examenId) {
      try{
          await axios.post(`${import.meta.env.VITE_API_URL}/email/enviar_correo`, {
            examen_id: examenId
          });
      } catch (error) {
        console.error("Error al enviar los correos: ", error);
      }
    } 
    
    async cambiarEstado (examenId) {
      try{
          await axios.put(`${import.meta.env.VITE_API_URL}/email/cambiar_estado_resultado/${examenId}`);
      } catch (error) {
        console.error("El estado no se puedo cambiar: ",error);
      }
    }

    async examenPorId (examenId){
      try{
        const responce = await axios.get(`${import.meta.env.VITE_API_URL}/examen/examen/${examenId}`);
        return responce.data;
      } catch(error) {
        console.error("no se puedo obtener el examen: ", error);
      }
    }

  async editarExamen(examenId, formularioExamen) {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/examen/editar_examen/${examenId}`, formularioExamen);
    } catch (error) {
      console.error("No se puedo editar el examen: ", error);
    }
  }
};

export default new examenService();