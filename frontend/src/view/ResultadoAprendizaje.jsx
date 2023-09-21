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
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {resultadoAprendizaje.map((resultado) => (
                        <tr key={resultado.id}>
                            <td>{resultado.titulo}</td>
                            <td>{resultado.descripcion}</td>
                            <td>boton</td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}