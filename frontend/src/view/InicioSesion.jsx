import { useState } from "react";

export const InicioSesionUsuarios = () =>{
    
    const [autentificacion, setAutentificacion] = useState({
        usuario: '',
        contraseña: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAutentificacion({ ...autentificacion, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return(
        <>
         <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="username">Usuario:</label>
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
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    value={autentificacion.contraseña}
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