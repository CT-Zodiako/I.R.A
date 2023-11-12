import examenService from '../../services/ServiciosExamen';
import { EvaluacionInformacion, AgregarListaEstudiantes, RegistrarActividadFormativa, PanelSeleccionarEvaluador } from './indexExamen'
import { useSelector } from 'react-redux';

export const FormularioPorPasos = () => {

  const enviarExamen = useSelector((state) => state.examenFormulario)
  const [componenteExamen, setComponenteExamen] = useState(1);

  const onNext = () => {
    setComponenteExamen(siguiente => siguiente + 1);
  };

  const onEnviarFormularioExamen = async(event) => {
    event.preventDefault();
    try {
      const responce = await examenService.agregarExamen(enviarExamen);
    } catch (error) {
      console.error('Error al enviar los datos del examen:', error);
    }
  }  

  return(
    <>
      { componenteExamen == 1 &&
        (<EvaluacionInformacion 
          handleNext={onNext} 
        />
      )}
        
      {componenteExamen == 2 &&
        (<PanelSeleccionarEvaluador
          handleNext={onNext}
        />
      )}
        
      { componenteExamen == 3 &&
        (<RegistrarActividadFormativa
          handleNext={onNext}
        />
      )}

      { componenteExamen == 4 &&
        (<AgregarListaEstudiantes
          handleNext={onNext}
        />
      )}

      {step === 5 && (
        <div>
          <button type='submit' onClick={onEnviarFormularioExamen}>Crear Examen</button>
        </div>
      )}
    </>
  );
}
