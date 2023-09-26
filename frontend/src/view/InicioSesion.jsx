import { useState } from "react";
import loginService from "../services/ServicioLogin";

export const InicioSesionUsuarios = () =>{
    
    const [autentificacion, setAutentificacion] = useState({
        usuario: '',
        contrasena: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAutentificacion(
            { ...autentificacion, 
                [name]: value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await loginService.verificarLogin(autentificacion); 
            console.log(response.data);
        }catch(error){
            console.error('Error al enviar los datos:', error);        }
    }

    return(
        <>
         <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Usuario:</label>
                <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={autentificacion.usuario}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    required
                />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
            </div>
        </>
    );
}