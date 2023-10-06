import { Route, Routes } from 'react-router-dom';
import { InicioSesionUsuarios } from './view/InicioSesion'
import { CrearExamen } from '../src/view/Examen'; 
import { CrearEvaluador } from './view/AgregarEvaluador';
import { EvaluadorLista } from './components/Evaluadores/Evaluador'; 
import { ResultadoAprendizaje } from './view/ResultadoAprendizaje';
import { CrearResultado } from './components/ResultadoComponentes/agregarResultadoAprendizaje'; 
import { VistaExamenes } from './components/Evaluadores/ListaExamenes';
import { VistaEstudiantes } from './components/Evaluadores/ListaEstudiantes';
import { CalificacionExamen } from './components/Evaluadores/CalificarEstudiante';
// import { FormularioPorPasos } from './components/EvaluadorComponentes/pruebaPasos'; 

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<InicioSesionUsuarios/>} />
      <Route path="/examen" element={<CrearExamen/>} />
      <Route path="/gestion-usuario" element={<CrearEvaluador/>} />
      <Route path="/evaluadores" element={<EvaluadorLista/>}/>
      <Route path="/resultado-aprendizaje" element={<ResultadoAprendizaje/>}/>
      <Route path="/agregar-resultado" element={<CrearResultado/>}/>
      <Route path="/lista_examenes" element={<VistaExamenes/>}></Route>
      <Route path="/lista-estudiantes/:examenId" element={<VistaEstudiantes/>}></Route>
      <Route path="/calificacion-examen/:examenId/:nombreEstudiante" element={<CalificacionExamen/>}></Route>
      {/* <Route path="/historial" element={<FormularioPorPasos/>} /> */}
    </Routes>
  );
}

export default Routers;