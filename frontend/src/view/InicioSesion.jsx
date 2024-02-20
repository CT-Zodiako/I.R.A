import { useState } from "react";
import loginService from "../services/ServicioLogin";
import { useDispatch } from "react-redux";
import { iniciarSesion } from "../redux/inicioSesionSlipe";
import axios from "axios";
import { Button, TextField } from "@mui/material";
// import unimayor from "../../public/img/unimayor.png";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

export const InicioSesionUsuarios = ({ onAutenticacion }) => {
  const dispatch = useDispatch();
  const [autentificacion, setAutentificacion] = useState({
    username: "",
    password: "",
  });


  const [mostrarLabel, setMostrarLabel] = useState(true);
  
  const onAutentificacion = (event) => {
    const { name, value } = event.target;
    const labelEvento = event.target;
    setAutentificacion({ 
      ...autentificacion, 
      [name]: value 
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
        <div style={{ marginBottom: "2rem"}}>
          <img src="https://unimayor.edu.co/web/images/imagenes/escudo.jpg" alt="unimayor"/>
        </div>
        <form onSubmit={onInicioSesion}>
          <div className="componentes">
            <div className="informacionInicioSesion">
              <TextField
                sx={{border: '1px solid #10457F' }}
                className="inputInicionSesion"
                type="text"
                name="username"
                value={autentificacion.username}
                onChange={onAutentificacion}
                id="outlined-basic"
                placeholder="USUARIO"
                required
                InputProps={{
                  startAdornment:(
                    <PersonIcon
                      sx={{ color: "#10457F" }}
                    />
                  ),
                }}
              />
            </div>
            <div className="informacionInicioSesion">
              <TextField
                sx={{ border: '1px solid #10457F' }}
                className="inputInicionSesion"
                type="password"
                name="password"
                value={autentificacion.password}
                onChange={onAutentificacion}
                id="outlined"
                placeholder="CONTRASEÑA"
                required
                InputProps={{
                  startAdornment:(
                    <LockIcon 
                      sx={{ color: "#10457F" }}
                    />
                  ),
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
