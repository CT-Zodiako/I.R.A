import axios from 'axios';

class informeServicio{
    async informeExamen() {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/examen/examenes`);
          return response.data;
        } catch (err) {
          console.error(err);
        }
      }
      
    async promedioActividades(evaluadorId) {
      try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/informes/traer_calificaciones/${evaluadorId}`);
          return response.data;
      } catch (err) {
        console.error(err);
      }
   }

   async promedioGraficaGeneral(evaluadorId) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/informes/traer_calificaciones/${evaluadorId}`);
        return response.data.conteo;
    } catch (err) {
      console.error(err);
    }
  }

  async actividadesDescripcion(evaluadorId) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/examen/actividades/${evaluadorId}`);
        return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async graficoInformeGeneral(evaluadorId) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/informes/informe/${evaluadorId}`);
      return response.data;      
    } catch (err) {
      console.error(err);
    }
  }

  async graficoInformeActividades(evaluadorId) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/informes/informeActividad/${evaluadorId}`);
      return response.data;      
    } catch (err) {
      console.error(err);
    }
  }
}

export default new informeServicio();
