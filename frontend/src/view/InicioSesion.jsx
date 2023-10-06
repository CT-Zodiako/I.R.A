import { useState } from "react";
import loginService from "../services/ServicioLogin";

export const InicioSesionUsuarios = () =>{
    
    const [autentificacion, setAutentificacion] = useState({
        usuario: '',
        contrasena: '',
    });

    const onAutentificacion = (event) => {
        const { name, value } = event.target;
        setAutentificacion(
            { ...autentificacion, 
                [name]: value 
        });
    };

    const onInicioSesion = async (event) => {
        event.preventDefault();
        try{
            const response = await loginService.verificarLogin(autentificacion); 
        }catch(error){
            console.error('Error al enviar los datos del Usuario:', error);        }
    }

    return(
        <>
         <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={onInicioSesion}>
                <div>
                <label>Usuario:</label>
                <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={autentificacion.usuario}
                    onChange={onAutentificacion}
                    required
                />
                </div>
                <div>
                <label>Contraseña:</label>
                <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    value={autentificacion.contrasena}
                    onChange={onAutentificacion}
                    required
                />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
            </div>
        </>
    );
}