import { useState } from 'react';
import examenService from '../../services/ServiciosExamen';
import { EvaluacionInformacion, AgregarListaEstudiantes, RegistrarActividadFormativa, PanelSeleccionarEvaluador } from './indexExamen'
import { useSelector } from 'react-redux';

export const FormularioPorPasos = () => {

  const enviarExamen = useSelector((state) => state.examenFormulario)
  const [componenteExamen, setComponenteExamen] = useState(1);

  console.log('Renderizando FormularioPorPasos con componenteExamen:', componenteExamen);

  const onNext = () => {
    console.log('Next button clicked');
    setComponenteExamen(componenteExamen => componenteExamen + 1);
  };

  const onEnviarFormularioExamen = async(event) => {
    event.preventDefault();
    try {
      const responce = await examenService.agregarExamen(enviarExamen);
    } catch (error) {
      console.error('Error al enviar los datos del examen:', error);
    }
  } 
  
  switch (componenteExamen) {
    case 1:
      return <EvaluacionInformacion 
        handleNext={onNext} 
        />;
    case 2:
      return <PanelSeleccionarEvaluador
        handleNext={onNext}
        />;
    case 3:
      return <RegistrarActividadFormativa
        handleNext={onNext}
        />;
    case 4:
      return <AgregarListaEstudiantes
        handleNext={onNext}
        />;
    default:
      return <div>Formulario completado</div>;
  }
}
