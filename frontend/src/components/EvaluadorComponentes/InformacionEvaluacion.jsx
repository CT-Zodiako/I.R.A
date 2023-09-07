import { useEffect, useState } from 'react';
import { InputGeneral } from '../InputFormulario'
import { InputSeleccion } from '../EtiquetaSeleccionGeneral'
import resultadoAprendizajeServicio from '../../services/ServicioResultadoAprendizaje';

export const EvaluacionInformacion = ({handleNext}) => {
    
    const [proyectoIntegrador, setProyectoIntegrador] = useState([ ]);

    const onAddProyecto = (onInputGeneral) => {     
        if(proyectoIntegrador.includes(onInputGeneral))return; 
        setProyectoIntegrador([onInputGeneral, ...proyectoIntegrador]);   
    }
    const accionBoton = () =>{
        handleNext ();
        onAddProyecto();
    }

    const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);

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
                    <label>Resultado</label>
                    <InputSeleccion seleccion={resultadoAprendizaje}/>
                    <label>Proyecto Integrador</label>
                    <InputGeneral onInputGeneral= { value => onAddProyecto(value) }/>
                </div>
                <button onClick={ accionBoton }>Siguiente</button>
            </div>
        </>
    )
}