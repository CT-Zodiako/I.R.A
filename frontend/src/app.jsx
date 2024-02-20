import { useState } from "react";
import './index.css';
import Routers from './rutas';
import Menu from '../src/components/MenuGeneral';
import { InicioSesionUsuarios } from './view/InicioSesion';

const App = () => {
  const [autenticado, setAutenticado] = useState(false);

  const handleAutenticacion = () => {
    setAutenticado(true);
  };

  return (
    <div>
      {!autenticado && (
        <InicioSesionUsuarios onAutenticacion={handleAutenticacion} />
      )}
      {autenticado && (
        <>
          <Menu/>
          <div className="content">
            <Routers />
          </div>
        </>
      )}


    </div>
  );
};

export default App;
