import axios from 'axios';

class informeServicio{
    async informeExamen() {
        try {
          const response = await axios.get('http://127.0.0.1:3001/examen/examenes');
          return response.data;
        } catch (err) {
          console.error(err);
        }
      }
      
    async promedioEstudiante(evaluadorId) {
      try {
          const response = await axios.get(`http://127.0.0.1:3001/informes/traer_calificaciones/${evaluadorId}`);
          return response.data;
      } catch (err) {
        console.error(err);
      }
   }

   async promedioGrafica(evaluadorId) {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/informes/traer_calificaciones/${evaluadorId}`);
        return response.data.conteo;
    } catch (err) {
      console.error(err);
    }
 }

 async actividadesExamen(evaluadorId) {
  try {
    const response = await axios.get(`http://127.0.0.1:3001/examen/actividades/${evaluadorId}`);
      return response.data;
  } catch (err) {
    console.error(err);
  }
}
}

export default new informeServicio();
