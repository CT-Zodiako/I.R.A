import axios from 'axios';

class evaluadorService {
  async agregarEvaluador(formulario) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/evaluador/agregar_evaluador`, formulario);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async traerEvaluador() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/evaluador/traer_evaluadores`);
      return response.data.data;
    } catch (err) {
      console.error(err);
    }
    console.log(response);
  }

  async eliminarEvaluador(evaluador_id) {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/evaluador/eliminar_evaluador/${evaluador_id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async obtenerEvaluador(evaluadorId) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/evaluador/evaluador_id/${evaluadorId}`);
      return response.data.data;
    } catch (err) {
      console.error(err);
    }
  }

  async editarEvaluador(id, formulario) {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/evaluador/actualizar/${id}`, formulario);
    } catch (err) {
      console.error(err);
    }
  }

  async examenesEvaluador(id) {
    try {
      const responce = await axios.get(`${import.meta.env.VITE_API_URL}/evaluador/examenesBandejaEvaludor`, id);
      return (responce.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  async estudiantesExamen(id) {
    try {
      const responce = await axios.get(`${import.meta.env.VITE_API_URL}/examen/estudiantes_examen/${id}`);
      return (responce.data.data.estudiantes)
    } catch (err) {
      console.error(err)
    }
  }

  async calificacionEvaluador(id_examen) {
    try {
      const responce = await axios.get(`${import.meta.env.VITE_API_URL}/calificacion/actividades_examen/${id_examen}`);
      return (responce.data)
    } catch (err) {
      console.error(err)
    }
  }

  async calificacionEstudiante() {
    try {
      const responce = await axios.get(`${import.meta.env.VITE_API_URL}/calificacion/enum_calificacion`);
      return (responce.data)
    } catch (err) {
      console.error(err)
    }
  }

  async calificacionActividadEstudiante(calificacionesEstudiantes) {
    try {
      const responce = await axios.post(`${import.meta.env.VITE_API_URL}/calificacion/guardar_calificacion`, calificacionesEstudiantes);
      return (responce.data)
    } catch (err) {
      console.error(err)
    }
  }

};

export default new evaluadorService();