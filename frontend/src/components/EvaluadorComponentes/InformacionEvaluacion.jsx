import { useState } from "react";
import { InputGeneral } from "../InputFormulario"
import { InputSeleccion } from '../EtiquetaSeleccionGeneral'

export const EvaluacionInformacion = ({handleNext}) => {
    
    const [proyectoIntegrador, setProyectoIntegrador] = useState([ ]);

    const onAddCategory = (onInputGeneral) => {     
        if(proyectoIntegrador.includes(onInputGeneral))return; 
        setProyectoIntegrador([onInputGeneral, ...proyectoIntegrador]);   
    }

    const accionBoton = () =>{
        handleNext ();
        onAddCategory();
    }
    
    return(
        <>
            <div>
                <h1>Información de la evaluación</h1>
                <div>
                    <label>Resultado</label>
                    <InputSeleccion/>
                    <label>Proyecto Integrador</label>
                    <InputGeneral onInputGeneral= { value => onAddCategory(value) }/>
                </div>
                <button onClick={ accionBoton }>Siguiente</button>
            </div>
        </>
    )
}