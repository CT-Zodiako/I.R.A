import axios from 'axios';

class informeServicio{
    async informeExamen() {
        try {
          const response = await axios.get('http://127.0.0.1:3001/informes/traer_calificaciones');
          return response.data;
        } catch (err) {
          console.error(err);
        }
      }
      
    async promedioEstudiante(evaluadorId) {
      try {
        const response = await axios.get(`http://127.0.0.1:3001/informes/calificacion_by_id_examen/${evaluadorId}`);
          return response.data.calificaciones;
      } catch (err) {
        console.error(err);
      }
   }
}

export default new informeServicio();
