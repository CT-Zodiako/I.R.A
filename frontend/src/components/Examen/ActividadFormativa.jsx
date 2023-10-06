import { useState } from "react";

export const RegistrarActividadFormativa = (actividadFormativa, agregarActividad) =>{
    
    const[nuevaActividad, setNuevaActividad] = useState({descripcion:''});
    
    const onActividadFormativa = (event) =>{
        setNuevaActividad(event.target.value);
    }

    const onEnviarActividad = (event) =>{
        event.preventDefault();
        actividadFormativa(nuevaActividad);
    }

    return(
        <>
            <form onSubmit={onEnviarActividad}>
                <div>
                    <input
                        type="text"
                        name="descripcion"
                        value={nuevaActividad.descripcion}
                        onChange={onActividadFormativa}
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
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
        </>
    );
}