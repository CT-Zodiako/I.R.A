import { useState, useEffect} from 'react';
import { InputSeleccion } from '../EtiquetaSeleccionGeneral'
import resultadoAprendizajeServicio from '../../services/ServicioResultadoAprendizaje';

export const EvaluacionInformacion = ({handleNext, formularioExamen, setFormulario}) => {
    
    const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);
    const [programa, setPrograma] = useState('');
    const [proyectoIntegrador, setProyectoIntegrador] = useState('');

    const handleProgramaChange = (e) =>{
        setPrograma(e.target.value);
    }

    const handleIntegradorChange = (e) =>{
        setProyectoIntegrador(e.target.value);
    }



    const accionBoton = () =>{
        handleNext ();
        onAddProyecto();
    }

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await resultadoAprendizajeServicio.traerResultado();
            setResultadoAprendizaje(data);
          } catch (error) {
            console.error('Error al obtener el resultado:', error);
          }
        }
        fetchData();
      }, []);
    
    return(
        <>
            <form action="">
                <div>
                    <h1>Información de la evaluación</h1>
                    <div>
                        <div>
                            <label>
                                Programa:
                                <input 
                                    type="text" 
                                    name="programa" 
                                    value={programa} 
                                    onChange={handleProgramaChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Resultado:
                                <InputSeleccion seleccion={resultadoAprendizaje} propiedad="titulo"/>  
                            </label>
                        </div>
                        <div>
                            <label>
                                Programa Integrador:
                                <input 
                                    type="text" 
                                    name="proyecto_integrador" 
                                    value={proyectoIntegrador} 
                                    onChange={handleIntegradorChange}
                                />
                            </label>
                        </div>
                    </div>
                    <button onClick={ accionBoton }>Siguiente</button>
                </div>
            </form>
        </>
    )
}