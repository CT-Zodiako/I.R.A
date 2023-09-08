import { useEffect, useState } from "react";
import { InputSeleccion } from "../EtiquetaSeleccionGeneral"

export const PanelSeleccionarEvaluador = () =>{
    
    const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);

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
            <div>
                <h1>Panel Evaluadores</h1>
                <div>
                    <div>
                        <label>
                            Resultado:
                            <InputSeleccion  seleccion={resultadoAprendizaje}/>  
                        </label>
                    </div>
                    <div>
                        <label>
                            Resultado:
                            <InputSeleccion  seleccion={resultadoAprendizaje}/>  
                        </label>
                        {/*aqui debe ir la tabla donde se mostraran los evaluadores seleccionados*/}
                    </div>
                </div>
            </div>
        </>
    )
}