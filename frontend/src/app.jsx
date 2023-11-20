import React from 'react';
import './index.css';
import Routers from './rutas';
import Menu from '../src/components/MenuGeneral';
// import { InicioSesionUsuarios } from './view/InicioSesion';

const App = () => {
  return (
    <div>
      {/* < InicioSesionUsuarios/> */}
      <Menu/>
      <div className="content">
        <Routers/>
      </div>
    </div>
  );
};

export default App;