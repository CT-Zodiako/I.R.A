import { Route, Routes } from 'react-router-dom';
import { CrearExamen } from '../src/view/Examen'; 
import { EvaluacionInformacion } from './components/EvaluadorComponentes/InformacionEvaluacion'; 
import { FormularioPorPasos } from './components/EvaluadorComponentes/pruebaPasos'; 

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<CrearExamen/>} />
      <Route path="/gestion-usuario" element={<EvaluacionInformacion/>} />
      <Route path="/historial" element={<FormularioPorPasos/>} />
    </Routes>
  );
}

export default Routers;