import { useEffect, useState } from "react";
import informeServicio from '../../services/ServicioInforme'
import { Link } from "react-router-dom";

export const Informes = () => {
    const [calificacionesExamen, setCalificacionesExamen] = useState([]);

    console.log("calificaciones examenes: ",calificacionesExamen);
    const evaluadoresExamen = calificacionesExamen.nombres_evaluadores;
    console.log(evaluadoresExamen);

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await informeServicio.informeExamen();
            setCalificacionesExamen(data);
            console.log(data);
          } catch (error) {
            console.error('Error al obtener la lista de examenes:', error);
          }
        }
        fetchData();
      }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Examen Id</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                {calificacionesExamen.map((informes) => (
                    <tr key={informes.id}>
                        <td>{informes.id}</td>
                        <td>{informes.proyecto_integrador}</td>
                        <td>
                            <button>
                                <Link to={`/informe-estudiante/${informes.id}/${informes.proyecto_integrador}`}>Ver Informe</Link>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
