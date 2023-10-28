import { useEffect, useState } from "react";
import informeServicio from '../../services/ServicioInforme'
import { Link } from "react-router-dom";

export const Informes = () => {
    const [calificacionesExamen, setCalificacionesExamen] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await informeServicio.informeExamen();
            setCalificacionesExamen(data.calificaciones);
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
                    <tr key={informes.examen_id}>
                        <td>{informes.examen_id}</td>
                        <td>{informes.id}</td>
                        <td>
                            <button>
                                <Link to={`/informe-estudiante/${informes.examen_id}`}>Ver Informe</Link>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
