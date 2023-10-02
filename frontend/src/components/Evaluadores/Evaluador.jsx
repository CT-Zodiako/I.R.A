import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';
import { Link } from 'react-router-dom';

export const EvaluadorLista = () =>{
    const[evaluadores, setEvaluadores] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await evaluadorService.traerEvaluador();
            setEvaluadores(data);
            console.log(data)
          } catch (error) {
            console.error('Error al obtener el resultado:', error);
          }
        }
        fetchData();
      }, []);
      
      const onEliminarEvaluador = async (e, evaluador_Id) => {
        e.preventDefault();
        try {
          await evaluadorService.eliminarEvaluador(evaluador_Id);
          const nuevaListaEvaluador = await evaluadorService.traerEvaluador();
          setEvaluadores(nuevaListaEvaluador);
        } catch (error) {
          console.error(error);
        }
      };
    
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
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Numero de Identificacion</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {evaluadores.map((evaluador) => (
                        <tr key={evaluador.id}>
                            <td>{evaluador.nombre_evaluador}</td>
                            <td>{evaluador.correo}</td>
                            <td>{evaluador.telefono}</td>
                            <td>{evaluador.numero_identificacion}</td>
                            <td>
                                <div>
                                    {/* <button onClick={(e) => onCambiarEstadoEvaluador(e, evaluador.id)}>{evaluador.estado ? 'Desactivar' : 'Activar'}</button> */}
                                    <button><Link to={`/gestion-usuario/${evaluador.id}`}>Editar</Link></button>
                                    <button onClick={(e) => onEliminarEvaluador(e, evaluador.id)}>Eliminar</button>
                                </div>  
                            </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}