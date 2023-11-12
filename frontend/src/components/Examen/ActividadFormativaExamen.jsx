import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarActividad } from "../../redux/examenSlice";

export const RegistrarActividadFormativa = ({handleNext}) => {

    const dispatch = useDispatch();
    
    const [actividaEstado, setActividaEstado] = useState({
        descripcion: ''
    });
    const [actividadFormativa, setActividadFormativa] = useState({
        actividades_formativas: [],
    });
    
    const onActividadFormativa = (event) => {
        setActividaEstado(event.target.value)
    };

    const onAgregarActividad = () => {
        setActividadFormativa({
          ...actividadFormativa,
          actividades_formativas: [actividadFormativa.actividades_formativas, actividaEstado]
        });
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
                            name="descripcion"
                            value={actividaEstado.descripcion}
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
                    <button type="submit">Cargar</button>
                </div>
            </form>
        </>
    );
}