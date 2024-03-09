import { useEffect, useState } from "react";
import './index.css';
import Routers from './rutas';
import Menu from '../src/components/MenuGeneral';
import { InicioSesionUsuarios } from './view/InicioSesion';
import axios from "axios";
import jwtDecode from "jwt-decode";

const App = () => {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const verificarAutenticacion = () => {
      const token = localStorage.getItem('token');
      
      if (token) {
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
