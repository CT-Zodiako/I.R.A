import { Route, Routes } from 'react-router-dom';
import { InicioSesionUsuarios } from './view/InicioSesion'
import { CrearExamen } from '../src/view/Examen'; 
import { CrearEvaluador } from './view/AgregarEvaluador';
import { EvaluadorLista } from './components/Evaluadores/EvaluadorLista'; 
import { ResultadoAprendizaje } from './view/ResultadoAprendizaje';
import { CrearResultado } from './components/ResultadoComponentes/agregarResultadoAprendizaje'; 
import { VistaExamenes } from './components/Evaluadores/ListaExamenes';
import { VistaEstudiantes } from './components/Evaluadores/ListaEstudiantes';
import { CalificacionExamen } from './components/Evaluadores/CalificarEstudiante';
import { Informes } from './components/InformesExamenes/informes'
import { GraficoInforme } from './components/InformesExamenes/grafico'
import { PromedioEstudiante } from './components/InformesExamenes/informeEstudinates'
import ProteccionRuta from './rutasProtegidas';
import { FormularioPorPasos } from './components/Examen/pruebaPasos';
import { ExamenesLista } from './components/Examen/ListaExamenes';
import { EditarExamen } from './components/Examen/editarExamen';
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<ProteccionRuta rolesPermitidos={'Admin'}/>}>
        <Route path="/lista_examen" element={<ExamenesLista/>}/>
        <Route path='/editar_examen' element={<EditarExamen/>}/>
        <Route path="/examen" element={<CrearExamen/>}/>
        <Route path="/gestion-usuario" element={<CrearEvaluador/>} />
        <Route path="/evaluadores" element={<EvaluadorLista/>}/>
        <Route path="/resultado-aprendizaje" element={<ResultadoAprendizaje/>}/>
        <Route path="/agregar-resultado" element={<CrearResultado/>}/>
        <Route path="/informe_examen" element={<Informes/>}></Route>
      </Route>
      <Route path="/lista_examenes" element={<VistaExamenes/>}></Route>
      <Route path="/lista-estudiantes/:examenId" element={<VistaEstudiantes/>}></Route>
      <Route path="/calificacion-examen/:examenId/:nombreEstudiante" element={<CalificacionExamen/>}></Route>
      <Route path="/grafica-informe" element={<GraficoInforme/>}></Route>
      <Route path="/informe-estudiante" element={<PromedioEstudiante />} />
      {/* <Route path="/informe-estudiante/:evaluadorId/:proyectoIntegrador" element={<PromedioEstudiante/>}></Route> */}
      <Route path="/pasos" element={<FormularioPorPasos/>} />
    </Routes>
  );
}

export default Routers;


