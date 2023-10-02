import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';
import { Link, useParams } from "react-router-dom";

export const VistaEstudiantes = () => {
    
    const[listaEstudiantes, setListaEstudiantes] = useState([]);
    const { examenId } = useParams();

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await evaluadorService.estudiantesExamen(examenId);
            setListaEstudiantes(data);
          } catch (error) {
            console.error('Error al obtener la lista de examenes:', error);
          }
        }
        fetchData();
      }, [examenId]);

    return(
        <>
            <div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Nombre Estudiante</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Codigo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listaEstudiantes.map((estudiante, Index) => (
                        <tr key={Index}>
                            <td>{estudiante.NOMBRE}</td>
                            <td>{estudiante.CORREO}</td>
                            <td>{estudiante.CODIGO}</td>
                            <td>
                                <div>
                                    <button type='submit'>
                                        <Link to={`/calificacion-examen/${estudiante.NOMBRE}`}>
                                            Calificar
                                        </Link>
                                    </button>
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
