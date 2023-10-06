import { useState, useEffect} from 'react';
import { InputSeleccion } from '../EtiquetaSeleccionGeneral'
import resultadoAprendizajeServicio from '../../services/ServicioResultadoAprendizaje';

export const EvaluacionInformacion = ({formularioExamen, programaFuncion, aprendizajeResultado, programaIntegrador}) => {
    
    const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);
    const [programa, setPrograma] = useState();
    const [proyectoIntegrador, setProyectoIntegrador] = useState();

    const onPrograma = (event) =>{
        setPrograma(event.target.value);
    }

    const onProyectoIntegrador = (event) =>{
        setProyectoIntegrador(event.target.value);
    }

    const envioInfoEvaluacion = (event) =>{
        event.preventDefault();
        programaFuncion(programa);
        aprendizajeResultado(resultadoAprendizaje);
        programaIntegrador(proyectoIntegrador);
    }

    // const accionBoton = () =>{
    //     handleNext ();
    //     onAddProyecto();
    // }

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
            <form onSubmit={envioInfoEvaluacion}>
                <div>
                    <h1>Información de la evaluación</h1>
                    <div>
                        <div>
                            <label>
                                Programa:
                                <input 
                                    type="text" 
                                    name="programa" 
                                    value={formularioExamen.programa} 
                                    onChange={onPrograma}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Resultado:
                                <InputSeleccion 
                                    seleccion={resultadoAprendizaje} 
                                    seleccionIdRA={aprendizajeResultado}/>  
                            </label>
                        </div>
                        <div>
                            <label>
                                Programa Integrador:
                                <input 
                                    type="text" 
                                    name="proyecto_integrador" 
                                    value={formularioExamen.proyectointegrador} 
                                    onChange={onProyectoIntegrador}
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