import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';
import { Link } from 'react-router-dom';

export const VistaExamenes = () =>{
    
    const[listaExamenes, setListaExamenes]= useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await evaluadorService.examenesEvaluador();
            console.log(data)
            setListaExamenes(data);
          } catch (error) {
            console.error('Error al obtener la lista de examenes:', error);
          }
        }
        fetchData();
      }, []);

      const onListaEstudiantes = async (id) => {
      try {
        await evaluadorService.buscarEvaluador(id);
      } catch (error) {
        console.error(error);
      }
    };

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
                        {listaExamenes.map((examenes) => (
                        <tr key={examenes.id}>
                            <td>{examenes.programa}</td>
                            <td>{examenes.proyecto_integrador}</td>
                            <td>Pendiente</td>
                            <td>
                                <div>
                                    <button onClick={onListaEstudiantes(examenes.id)}><Link to="/lista-estudiantes">Calificar</Link></button>
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