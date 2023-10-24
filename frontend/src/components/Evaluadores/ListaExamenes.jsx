import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';
import { Link } from 'react-router-dom';

export const VistaExamenes = () =>{
    
    const[listaExamenesEvaluador, setListaExamenesEvaluador]= useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await evaluadorService.examenesEvaluador();
            setListaExamenesEvaluador(data);
          } catch (error) {
            console.error('Error al obtener la lista de examenes:', error);
          }
        }
        fetchData();
      }, []);

    return(
        <>
            <div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Programa</th>
                            <th>Titulo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listaExamenesEvaluador.map((examenes) => (
                        <tr key={examenes.id}>
                            <td>{examenes.programa_id}</td>
                            <td>{examenes.proyecto_integrador}</td>
                            <td>Pendiente</td>
                            <td>
                                <button>
                                    <Link to={`/lista-estudiantes/${examenes.id}`}>
                                        Calificar
                                    </Link>
                                </button>
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