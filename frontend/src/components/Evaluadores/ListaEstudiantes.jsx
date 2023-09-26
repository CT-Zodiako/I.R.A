import { useEffect, useState } from "react";
import evaluadorService from '../../services/servicioEvaluador';

export const VistaEstudiantes = () => {
    
    const[listaEstudiantes, setListaEstudiantes] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await evaluadorService.estudiantesEvaluador();
            console.log(data)
            setListaEstudiantes(data);
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
                            <th>Nombre Estudiante</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Codigo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listaEstudiantes.map((data) => (
                        <tr key={data.id}>
                            <td>{data.estudiantes}</td>
                            <td></td>
                            <td>Pendiente</td>
                            <td>
                                <div>
                                    {/* <button onClick={(e) => onCambiarEstadoEvaluador(e, evaluador.id)}>{evaluador.estado ? 'Desactivar' : 'Activar'}</button> */}
                                    {/* <button onClick={(e) => onEditarEvaluador(evaluador.id)}><Link to="/gestion-usuario">Editar</Link></button> */}
                                    {/* <button onClick={(e) => onEliminarEvaluador(e, evaluador.id)}>Eliminar</button> */}
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
