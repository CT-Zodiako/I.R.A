import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { idExamenCalificacion } from '../../redux/calificacionSlice';

export const VistaExamenes = () =>{

    const dispatch = useDispatch();
    const evaluadorId = useSelector((state) => state.sesion.id);

    const[listaExamenesEvaluador, setListaExamenesEvaluador]= useState([]);

    const onIdExamen = ({ examen }) => {
        const examenId = examen;
        dispatch(
            idExamenCalificacion({ 
                examenId: examenId, 
            })
        );
        console.log(examenId);
    }

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await evaluadorService.examenesEvaluador(evaluadorId);
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
                                <button onClick={() => onIdExamen({ examen: examenes.id })}>
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