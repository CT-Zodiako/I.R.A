import { useEffect, useState } from "react";
import './index.css';
import Routers from './rutas';
import Menu from '../src/components/MenuGeneral';
import { InicioSesionUsuarios } from './view/InicioSesion';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { cambiarEstadoBoton } from "./redux/botonAlertaSlice";
import { agregarPrograma } from "./redux/programaSlice";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "./redux/inicioSesionSlipe";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const verificarAutenticacion = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);

        const tokenData = token.split(".")[1];
        const decoToken = JSON.parse(atob(tokenData));
        if (decoToken) {
          const usuarioId = decodedToken.sub.id;
          const usuario = decodedToken.sub.nombre;
          const rol = decodedToken.sub.rol;
          dispatch(
            iniciarSesion({
              id: usuarioId,
              username: usuario,
              rol: rol,
            })
          );
        }
        if (decodedToken.exp * 1000 < Date.now()) {
          handleCerrarSesion();
        } else {
          setAutenticado(true);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      }
    };
    verificarAutenticacion();
  }, []);

  const handleAutenticacion = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAutenticado(true);
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setAutenticado(false);
    dispatch(
      cambiarEstadoBoton({
        botonAlerta: false,
        notificacion: "",
      })
    );
    dispatch(
      agregarPrograma({
        programa: ''
      })
    );
    navigate('/');
  };

  return (
    <div>
      {!autenticado && (
        <InicioSesionUsuarios onAutenticacion={handleAutenticacion} />
      )}
      {autenticado && (
        <>
          <Menu onCerrarSesion={handleCerrarSesion}/>
          <div className="content">
            <Routers />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
