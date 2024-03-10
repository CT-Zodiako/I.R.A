import { useState } from "react";
import loginService from "../services/ServicioLogin";
import { useDispatch } from "react-redux";
import { iniciarSesion } from "../redux/inicioSesionSlipe";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Cookies from 'js-cookie';

export const InicioSesionUsuarios = ({ onAutenticacion }) => {
  const dispatch = useDispatch();
  const [autentificacion, setAutentificacion] = useState({
    username: "",
    password: "",
  });

  const [mostrarLabel, setMostrarLabel] = useState(true);

  const onCredenciales = (event) => {
    const { name, value } = event.target;
    const labelEvento = event.target;
    setAutentificacion({
      ...autentificacion,
      [name]: value,
    });
    setMostrarLabel(labelEvento === " ");
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
        onAutenticacion(token);
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
          <div style={{ marginBottom: "2rem" }}>
            <img
              src="https://unimayor.edu.co/web/images/imagenes/escudo.jpg"
              alt="unimayor"
            />
          </div>
          <form onSubmit={onInicioSesion}>
            <div className="componentes">
              <div className="informacionInicioSesion">
                <TextField
                  sx={{ border: "1px solid #10457F" }}
                  className="inputInicionSesion"
                  type="text"
                  name="username"
                  value={autentificacion.username}
                  onChange={onCredenciales}
                  id="outlined-basic"
                  placeholder="USUARIO"
                  required
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ color: "#10457F" }} />,
                  }}
                />
              </div>
              <div className="informacionInicioSesion">
                <TextField
                  sx={{ border: "1px solid #10457F" }}
                  className="inputInicionSesion"
                  type="password"
                  name="password"
                  value={autentificacion.password}
                  onChange={onCredenciales}
                  id="outlined"
                  placeholder="CONTRASEÑA"
                  required
                  InputProps={{
                    startAdornment: <LockIcon sx={{ color: "#10457F" }} />,
                  }}
                />
              </div>
            </div>
            <div className="inicioSesionBoton">
              <Button
                sx={{ backgroundColor: "#10457F" }}
                className="botonSesion"
                type="submit"
                variant="contained"
              >
                Conectar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
