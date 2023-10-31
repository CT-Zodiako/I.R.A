import { useState } from "react";
import loginService from "../services/ServicioLogin";

export const InicioSesionUsuarios = () => {
    const [autentificacion, setAutentificacion] = useState({
        username: '',
        password: '',
    });

    const onAutentificacion = (event) => {
        const { name, value } = event.target;
        setAutentificacion({ ...autentificacion, [name]: value });
    };

    const onInicioSesion = async (event) => {
        event.preventDefault();
        try {
            const response = await loginService.verificarLogin(autentificacion);
            const token = response.data.access_token;

            localStorage.setItem('token', token);
            console.log("token: "+token);

            const tokenData = token.split('.')[1];
            console.log(tokenData);
            const decodedToken = JSON.parse(atob(tokenData));
            console.log(decodedToken.sub);

            if (decodedToken) {
                const userId = decodedToken.sub.id;
                const username = decodedToken.sub.nombre;
                const rol = decodedToken.sub.rol;

                console.log('ID del usuario:', userId);
                console.log('Nombre de usuario:', username);
                console.log('Rol del usuario: ', rol)
            } else {
                console.error('Error al decodificar el token');
            }

        } catch (error) {
            console.error('Error al enviar los datos del Usuario:', error);
        }
    };

    return (
        <>
            <div>
                <h2>Iniciar sesión</h2>
                <form onSubmit={onInicioSesion}>
                    <div>
                        <label>Usuario:</label>
                        <input
                            type="text"
                            id="usuario"
                            name="username"
                            value={autentificacion.username}
                            onChange={onAutentificacion}
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            id="contrasena"
                            name="password"
                            value={autentificacion.password}
                            onChange={onAutentificacion}
                            required
                        />
                    </div>
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
        </>
    );
};
