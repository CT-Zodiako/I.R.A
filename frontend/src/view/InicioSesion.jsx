import { useState } from "react";
import loginService from "../services/ServicioLogin";
import { useDispatch } from "react-redux";
import { iniciarSesion } from "../redux/inicioSesionSlipe";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const InicioSesionUsuarios = ({ onAutenticacion }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [autentificacion, setAutentificacion] = useState({
    username: "",
    password: "",
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

      localStorage.setItem("token", token);

      const tokenData = token.split(".")[1];
      const decodedToken = JSON.parse(atob(tokenData));

      if (decodedToken) {
        const userId = decodedToken.sub.id;
        const username = decodedToken.sub.nombre;
        const rol = decodedToken.sub.rol;

        console.log(userId);
        console.log(username);
        console.log("el rol: ",rol);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("token del usuario: ", token);

        dispatch(
          iniciarSesion({
            id: userId,
            username: username,
            rol: rol,
          })
        );
        onAutenticacion();
        // navigate('/app');

      } else {
        console.error("Error al decodificar el token");
      }
    } catch (error) {
      console.error("Error al enviar los datos del Usuario:", error);
    }
  };

  return (
    <>
    <div className="login">
      <div className="informacion">
        <h2>Iniciar sesión</h2>
        <form onSubmit={onInicioSesion}>
          <div className="componentes">
            <div>
              <label>Usuario:</label>
              <TextField
                type="text"
                name="username"
                value={autentificacion.username}
                onChange={onAutentificacion}
                id="outlined-basic"
                label="Usuario"
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <TextField
                type="password"
                name="password"
                value={autentificacion.password}
                onChange={onAutentificacion}
                id="outlined"
                label="Contraseña"
                required
              />
            </div>
          </div>
          <Button 
            type="submit"
            variant="contained"
          >
            Iniciar sesión
          </Button>
        </form>
      </div>      
    </div>
    </>
  );
};
