import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';
import { Link } from 'react-router-dom';

export const Evaluador = () =>{
    const[evaluadores, setEvaluadores] = useState([]);


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
                <div>
                    <button><Link to="/gestion-usuario">Agregar Evaluador</Link></button>
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
                        {evaluadores.map((evaluador) => (
                        <tr key={evaluador.id}>
                            <td>{evaluador.id}</td>
                            <td>{evaluador.nombre_evaluador}</td>
                            <td>{evaluador.correo}</td>
                            <td>{evaluador.telefono}</td>
                            <td>{}</td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}