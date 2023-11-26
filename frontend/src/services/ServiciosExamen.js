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
          return responce.data;
      } catch (error) {
        console.error("Error al traer la lista de examenes: ", error)
      }
    }

    async eliminarExamen(examenId) {
      try{
        await axios.delete(`http://127.0.0.1:3001/examen/eliminar_examen/${examenId}`);
      } catch (error) {
        console.error("No se pudo eliminar el examen", error)
      }
    }

    async correoEvaluadores (examenId) {
      try{
          await axios.post('http://127.0.0.1:3001/email/enviar_correo', {
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

    async examenPorId (examenId){
      try{
        const responce = await axios.get(`http://127.0.0.1:3001/examen/examen/${examenId}`);
        return responce.data;
      } catch(error) {
        console.error("no se puedo obtener el examen: ", error);
      }
    }

    async editarExamen(examenId, formularioExamen) {
      try{
        await axios.put(`http://127.0.0.1:3001/examen/editar_examen/${examenId}`, formularioExamen );
      } catch(error) {
        console.error("No se puedo editar el examen: ",error);
      }
    }
  };

export default new examenService();