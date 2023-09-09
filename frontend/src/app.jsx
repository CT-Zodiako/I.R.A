import React from 'react';
import './index.css';
import Routers from './rutas';
import Menu from '../src/components/MenuGeneral';

const App = () => {
  return (
    <div>
      <Menu/>
      <div className="content">
        <Routers/>
      </div>
    </div>
  );
};

export default App;