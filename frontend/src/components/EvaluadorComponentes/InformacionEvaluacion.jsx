import { useState, useEffect } from 'react';
import { InputSeleccion } from '../EtiquetaSeleccionGeneral'
import resultadoAprendizajeServicio from '../../services/ServicioResultadoAprendizaje';

export const EvaluacionInformacion = ({handleNext, formularioExamen, setFormulario}) => {
    
    const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);

    const handleProgramaChange = (event) => {
        const { name, value } = event.target;
        setFormulario({
          ...formularioExamen,
          [name]: value
        });
    };

    const handleIntegradorChange = (event) => {
        const { name, value } = event.target;
        setFormulario({
          ...formularioExamen,
          [name]: value
        });
    };

    const accionBoton = () =>{
        handleNext ();
        onAddProyecto();
    }

    useEffect(() => {
        const fetchData = async() =>{
            try{
                const data = await resultadoAprendizajeServicio.traerResultado();
                setResultadoAprendizaje(data);
            } catch(error){
                console.error('Error al obtener evaluadores:', error);
            }
        };
        fetchData();
    },[]);
    
    return(
        <>
            <div>
                <h1>Información de la evaluación</h1>
                <div>
                    <label>
                        Programa:
                        <input 
                            type="text" 
                            name="programa" 
                            value={formularioExamen.programa} 
                            onChange={handleProgramaChange}
                        />
                    </label>

                    <label>Resultado</label>
                    <InputSeleccion seleccion={resultadoAprendizaje}/>

                    <label>
                        Programa Integrador:
                        <input 
                            type="text" 
                            name="proyecto_integrador" 
                            value={formularioExamen.proyecto_integrador} 
                            onChange={handleIntegradorChange}
                        />
                    </label>
                </div>
                <button onClick={ accionBoton }>Siguiente</button>
            </div>
        </>
    )
}