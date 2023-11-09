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
// import { FormularioPorPasos } from './components/EvaluadorComponentes/pruebaPasos' {<CrearExamen/>}
import ProteccionRuta from './rutasProtegidas';

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<InicioSesionUsuarios/>} />
      {/* <Route path="/examen" element={<ProteccionRuta component={CrearExamen} rolesPermitidos={'Admin'}/>} /> */}
      {/* <ProteccionRuta path="/examen" rolesPermitidos={['Admin']} element={<CrearExamen />} /> */}
      <Route element={<ProteccionRuta rolesPermitidos={'Admin'} element={<CrearExamen/>}/>}>
          <Route path='/examen' element={<CrearExamen/>}/>
          <Route path="/gestion-usuario" element={<CrearEvaluador/>} />
          <Route path="/evaluadores" element={<EvaluadorLista/>}/>
          <Route path="/resultado-aprendizaje" element={<ResultadoAprendizaje/>}/>
          <Route path="/agregar-resultado" element={<CrearResultado/>}/>
      </Route>
      <Route path="/lista_examenes" element={<VistaExamenes/>}></Route>
      <Route path="/lista-estudiantes/:examenId" element={<VistaEstudiantes/>}></Route>
      <Route path="/calificacion-examen/:examenId/:nombreEstudiante" element={<CalificacionExamen/>}></Route>
      <Route path="/informe_examen" element={<Informes/>}></Route>
      <Route path="/grafica-informe" element={<GraficoInforme/>}></Route>
      <Route path="/informe-estudiante/:evaluadorId" element={<PromedioEstudiante/>}></Route>
      {/* <Route path="/historial" element={<FormularioPorPasos/>} /> */}
    </Routes>
  );
}

export default Routers;