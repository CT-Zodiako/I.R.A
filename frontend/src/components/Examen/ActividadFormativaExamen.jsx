import { useState } from "react";
import { useDispatch } from "react-redux";
import { agregarActividad } from "../../redux/examenSlice";

export const RegistrarActividadFormativa = ({handleNext}) => {

    const dispatch = useDispatch();
    
    const [actividaEstado, setActividaEstado] = useState({
        descripcion: ''
    });
    const [actividadFormativa, setActividadFormativa] = useState({
        actividades_formativas: [],
    });

    const [camposCargados, setCamposCargados] = useState(false);
    
    const onActividadFormativa = (event) => {
        const actividadDes = event.target.value;
        setActividaEstado({
            ...actividaEstado,
            descripcion: actividadDes
        })
    };

    const onAgregarActividad = () => {
        if (actividaEstado.descripcion) {
            setActividadFormativa({
                ...actividadFormativa,
                actividades_formativas: [...actividadFormativa.actividades_formativas, actividaEstado]
            });
            setCamposCargados(true);
        }
      };

    const eliminarActividadLista = (index) => {
        const nuevoFormulario = { ...actividadFormativa };
        const nuevasActividades = [...nuevoFormulario.actividades_formativas]
        nuevasActividades.splice(index, 1);
        nuevoFormulario.actividades_formativas = nuevasActividades;
        setActividadFormativa(nuevoFormulario)
    };

    const onEnviarActividad = (event) => {
        event.preventDefault();
        dispatch(
            agregarActividad({
                actividades_formativas: actividadFormativa.actividades_formativas
            })
        )
        handleNext();
    }
      
    return(
        <>
            <form onSubmit={onEnviarActividad}>
                <div>
                    <h3>Actividad Formativa</h3>
                    <div>
                        <input
                            type="text"
                            onChange={onActividadFormativa}
                            placeholder="Descripción actividad"
                        />
                        <button type="button" onClick={ onAgregarActividad }>
                        Agregar Actividad
                        </button>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                <th>descripcion</th>
                                </tr>
                            </thead>
                            <tbody>
                            {actividadFormativa.actividades_formativas.map((actividad, index) => (
                                <tr key={index}>
                                    <td>{actividad.descripcion}</td>
                                    <td>
                                        <button type='button' onClick={() => eliminarActividadLista(index)}>Eliminar</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={!camposCargados}>Cargar</button>
                </div>
            </form>
        </>
    );
}