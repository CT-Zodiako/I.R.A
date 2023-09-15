import { useState } from "react";

export const RegistrarActividadFormativa = (actividadFormativa) =>{
    
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
                </div>
            </form>
        </>
    );
}