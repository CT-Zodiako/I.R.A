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
            console.error('Error al obtener el evaluador:', error);
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
                            Evaluador:
                            <InputSeleccion 
                                seleccion={evaluadores} 
                                idSeleccion={seleccionEvaluador}/>  
                        </label>
                    </div>
                    <div>
                      <table>
                        <thead>
                        <tr>
                          <th>Nombre del Evaluador</th>
                          <th>Correo del Evaluador</th>
                        </tr>
                        </thead>
                        <tbody>
                          {formularioExamen.evaluadores_ids.map((evaluadorId, index) => {
                            const evaluador = evaluadores.find(e => e.id === evaluadorId);
                            if (!evaluador) {
                              return null; 
                            }
                            return (
                              <tr key={index}>
                                <td>{evaluador.nombre_evaluador}</td>
                                <td>{evaluador.correo}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
        </>
    )
}