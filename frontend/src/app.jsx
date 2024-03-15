import { useEffect, useState } from "react";
import './index.css';
import Routers from './rutas';
import Menu from '../src/components/MenuGeneral';
import { InicioSesionUsuarios } from './view/InicioSesion';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { iniciarSesion } from "./redux/inicioSesionSlipe";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const verificarAutenticacion = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const tokenData = token.split(".")[1];
        const decodificado = JSON.parse(atob(tokenData));
        if (decodificado) {
          const usuarioId = decodificado.sub.id;
          const usuario = decodificado.sub.nombre;
          const rol = decodificado.sub.rol;
          dispatch(
            iniciarSesion({
              id: usuarioId,
              username: usuario,
              rol: rol,
            })
          );
        }
        const decodedToken = jwtDecode(token);
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
