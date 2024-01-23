import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

class evaluadorService{
  async agregarEvaluador(formulario) {
    try {
      const response = await axios.post('http://127.0.0.1:3001/evaluador/agregar_evaluador', formulario);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async traerEvaluador() {
    try {
      const response = await axios.get('http://127.0.0.1:3001/evaluador/traer_evaluadores');
      return response.data.data;
    } catch (err) {
      console.error(err);
    }
    console.log(response);
  }

  async eliminarEvaluador(evaluador_id) {
    try {
      const response = await axios.delete(`http://127.0.0.1:3001/evaluador/eliminar_evaluador/${evaluador_id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async obtenerEvaluador(evaluadorId) {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/evaluador/evaluador_id/${evaluadorId}`);
      return response.data.data;
    } catch (err) {
      console.error(err);
    }
  }

  async editarEvaluador(id, formulario) {
    try {
      const response = await axios.put(`http://127.0.0.1:3001/evaluador/actualizar/${id}`, formulario);
    } catch (err) {
      console.error(err);
    }
  }

  async examenesEvaluador(id) {
    try{
      const responce = await axios.get(`http://127.0.0.1:3001/evaluador/examenes_evaluador/${id}`);
      return(responce.data.data)
    }catch(err){
      console.error(err)
    }
  }

  async estudiantesExamen(id) {
    try{
      const responce = await axios.get(`http://127.0.0.1:3001/evaluador/estudiantes_examen/${id}`);
      return(responce.data.data.estudiantes)
    }catch(err){
      console.error(err)
    }
  }

  async calificacionEvaluador(id_examen) {
    try{
      const responce = await axios.get(`http://127.0.0.1:3001/calificacion/actividades_examen/${id_examen}`);
      return(responce.data)
    }catch(err){
      console.error(err)
    }
  }

  async calificacionEstudiante() {
    try{
      const responce = await axios.get(`http://127.0.0.1:3001/calificacion/enum_calificacion`);
      return(responce.data)
    }catch(err){
      console.error(err)
    }
  }

  async calificacionActividadEstudiante(calificacionesEstudiantes) {
    try{
      const responce = await axios.post(`http://127.0.0.1:3001/calificacion/guardar_calificacion`, calificacionesEstudiantes);
      return(responce.data)
    }catch(err){
      console.error(err)
    }
  }

};

export default new evaluadorService();