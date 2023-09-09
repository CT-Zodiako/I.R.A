import { useEffect, useState } from "react";
import { InputSeleccion } from "../EtiquetaSeleccionGeneral";
import evaluadorService from '../../services/servicioEvaluador';

export const PanelSeleccionarEvaluador = () =>{
    
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

    // useEffect(() => {
    //     async function fetchData() {
    //       try {
    //         // Realizar una solicitud para obtener los datos de la base de datos
    //         const response = await evaluadorService.traerEvaluadores(); // Asumiendo que tienes una función traerEvaluadores en tu servicio
    //         setEvaluadores(response.data); // Suponiendo que los datos se encuentran en la propiedad "data" del objeto de respuesta
    //       } catch (error) {
    //         console.error('Error al obtener los datos:', error);
    //       }
    //     }
    //     fetchData();
    //   }, []);
    
    return(
        <>
            <div>
                <h1>Panel Evaluadores</h1>
                <div>
                    <div>
                        <label>
                            Resultado:
                            <InputSeleccion seleccion={evaluadores} propiedad="nombre_evaluador"/>  
                        </label>
                    </div>
                    <div>
                        <label>
                            Resultado:
                            <InputSeleccion seleccion={evaluadores} propiedad="nombre_evaluador"/>  
                        </label>
                        {/*aqui debe ir la tabla donde se mostraran los evaluadores seleccionados*/}
                    </div>
                </div>
            </div>
        </>
    )
}