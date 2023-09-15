import { useEffect, useState } from "react";
import { InputSeleccion } from "../EtiquetaSeleccionGeneral";
import evaluadorService from '../../services/servicioEvaluador';

export const PanelSeleccionarEvaluador = (formularioExamen, seleccionEvaluador) =>{
    
    const [evaluadores, setEvaluadores] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await evaluadorService.traerEvaluador();
            setEvaluadores(data);
          } catch (error) {
            console.error('Error al obtener el resultado:', error);
          }
        }
        fetchData();
      }, []);

    return(
        <>
            <div>
                <h1>Panel Evaluadores</h1>
                <div>
                    <div>
                        <label>
                            Resultado:
                            <InputSeleccion 
                                seleccion={evaluadores} 
                                idSeleccion={seleccionEvaluador}/>  
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}