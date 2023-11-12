import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {eliminarActividad} from '../../redux/examenSlice'

export const RegistrarActividadFormativa = ({handleNext}) => {

    const examen = useSelector((state) => state.examenFormulario);
    const dispatch = useDispatch();
    
    const [actividaEstado, setActividaEstado] = useState();
    const [actividadFormativa, setActividadFormativa] = useState({
        descripcion:''
    });
    
    const onActividadFormativa = (event) => {
        setActividaEstado(event.target.value)
    };

    const agregarActividad = () => {
        setActividadFormativa({
          ...actividadFormativa,
          descripcion: [actividadFormativa.descripcion, actividaEstado]
        });
      };

    const eliminarActividadLista = (index) => {
        const nuevoFormulario = { ...examen };
        const nuevasActividades = [...nuevoFormulario.actividades_formativas]
        nuevasActividades.splice(index, 1);
        nuevoFormulario.actividades_formativas = nuevasActividades;
        const nuevoFormularioExamen = nuevoFormulario;
        dispatch(
            eliminarActividad(nuevoFormularioExamen)
        )
    };

    const onEnviarActividad = () => {
        dispatch(
            agregarActividad({
                descripcion: actividadFormativa.descripcion
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
                            value={actividadFormativa.descripcion}
                            onChange={onActividadFormativa}
                            placeholder="Descripción actividad"
                        />
                        <button type="button" onClick={agregarActividad}>
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
                            {formularioExamen.actividades_formativas.map((actividad, index) => (
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