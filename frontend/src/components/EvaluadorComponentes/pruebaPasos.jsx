import { useState } from 'react';
import { EvaluacionInformacion } from './InformacionEvaluacion';
import { PanelSeleccionarEvaluador } from './PanelEvaluador';

export const FormularioPorPasos = () => {
  const [formularioExamen, setFormulario] = useState({
    programa: '',
    proyecto_integrador: '',
    evaluadores: [],
    actividades_formativas: [],
    estudiantes: []
  });
  
  const [paso, setPaso] = useState(1);

  const handleNext = () => {
    setPaso(paso + 1);
  };

  switch (paso) {
    case 1:
      return <Paso1 onNext={handleNext} />;
    case 2:
      return <Paso2 onNext={handleNext} />;
    default:
      return <div>Formulario completado</div>;
  }

  function Paso1({onNext}) {
    return (
      <EvaluacionInformacion 
        handleNext={onNext} 
        formularioExamen={formularioExamen} 
        setFormulario={setFormulario}/>
    );
  }
  
  function Paso2({ onNext }) {
    return (
      <PanelSeleccionarEvaluador/>
      // <div>
      //   <h2>Paso 2</h2>
      //   <label>Nombre:</label>
      //     <input
      //       type="text"
      //       name="nombre_evaluador"
      //       // value={formulario.nombre_evaluador}
      //       // onChange={handleChange}
      //       required
      //     />  
      //     <label>Nombre:</label>
      //     <input
      //       type="text"
      //       name="nombre_evaluador"
      //       // value={formulario.nombre_evaluador}
      //       // onChange={handleChange}
      //       required
      //     />     
      //   <button onClick={onNext}>Siguiente</button>
      // </div>
    );
  }
}
