import { useState } from "react";

export const RegistrarActividadFormativa = (actividadFormativa, agregarActividad) =>{
    
    const[nuevaActividad, setNuevaActividad] = useState({descripcion:''});
    
    const handleNuevaActividadChange = (e) =>{
        setNuevaActividad(e.target.value);
    }

    const enviarActividad = (e) =>{
        e.preventDefault();
        actividadFormativa(nuevaActividad);
    }

    return(
        <>
            <form onSubmit={enviarActividad}>
                <div>
                    <input
                        type="text"
                        name="descripcion"
                        value={nuevaActividad.descripcion}
                        onChange={handleNuevaActividadChange}
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