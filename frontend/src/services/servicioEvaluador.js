import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

class evaluadorService{
  async agregarEvaluador (formulario) {
    try {
      const response = await api.post('/evaluador/agregar_evaluador', formulario);
      return response.data;
    } catch (error) {
      console.error(error);
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

  async buscarEvaluador(id) {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/evaluador/evaluador_id/1`);
      return response.data.data;
    } catch (err) {
      console.error(err);
    }
  }

  async editarEvaluador(id) {
    try {
      const response = await axios.put(`http://127.0.0.1:3001/evaluador/actualizar/${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async examenesEvaluador(id) {
    try{
      const responce = await axios.get('http://127.0.0.1:3001/evaluador/examenes_evaluador/2');
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

};

export default new evaluadorService();