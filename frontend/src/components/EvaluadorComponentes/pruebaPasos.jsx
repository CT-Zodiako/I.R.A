import { useState } from 'react';
import { EvaluacionInformacion } from './InformacionEvaluacion';
// Puedes seguir creando componentes para los otros pasos (Paso3, Paso4, Paso5) de manera similar.

export const FormularioPorPasos = () => {
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
    // Aquí puedes definir los campos y lógica del primer paso
    return (
      <EvaluacionInformacion handleNext={onNext}/>
      // <div>
      //   <h2>Paso 1</h2>
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
      //     <button onClick={onNext}>Siguiente</button>
      // </div>
    );
  }
  
  function Paso2({ onNext }) {
    // Aquí puedes definir los campos y lógica del segundo paso
    return (
      <div>
        <h2>Paso 2</h2>
        <label>Nombre:</label>
          <input
            type="text"
            name="nombre_evaluador"
            // value={formulario.nombre_evaluador}
            // onChange={handleChange}
            required
          />  
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre_evaluador"
            // value={formulario.nombre_evaluador}
            // onChange={handleChange}
            required
          />     
        <button onClick={onNext}>Siguiente</button>
      </div>
    );
  }
}
