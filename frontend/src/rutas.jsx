import { Route, Routes } from 'react-router-dom';
import { CrearExamen } from '../src/view/Examen'; 
import { CrearEvaluador } from './view/AgregarEvaluador'; 
import { FormularioPorPasos } from './components/EvaluadorComponentes/pruebaPasos'; 

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<CrearExamen/>} />
      <Route path="/gestion-usuario" element={<CrearEvaluador/>} />
      <Route path="/historial" element={<FormularioPorPasos/>} />
    </Routes>
  );
}

export default Routers;