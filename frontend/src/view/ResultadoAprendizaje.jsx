import { useEffect, useState } from "react";
import resultadoAprendizajeServicio from '../services/ServicioResultadoAprendizaje';
import { Link } from 'react-router-dom';

export const ResultadoAprendizaje = () =>{
    const[resultadoAprendizaje, setResultadoAprendizaje] = useState([]);

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

      const onCambiarEstado = async (event, resultado_Id) => {
        event.preventDefault();
        try {
          await resultadoAprendizajeServicio.cambiarEstado(resultado_Id);
          const nuevaListaResultados = await resultadoAprendizajeServicio.traerResultado();
          setResultadoAprendizaje(nuevaListaResultados);
        } catch (error) {
          console.error(error);
        }
      };   
    
    return(
        <>
            <div>
                <div>
                    <button><Link to="/agregar-resultado">Agregar Resulatado Aprendizaje</Link></button>
                </div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Descripcion</th>
                            <th>Estado</th>
                            <th>id</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {resultadoAprendizaje.map((resultado) => (
                        <tr key={resultado.id}>
                            <td>{resultado.titulo}</td>
                            <td>{resultado.descripcion}</td>
                            <td>{resultado.estado ? 'Activo' : 'Inactivo'}</td>
                            <td>{resultado.id}</td>
                            <td><button onClick={(e) => onCambiarEstado(e, resultado.id)}>{resultado.estado ? 'Desactivar' : 'Activar'}</button></td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}