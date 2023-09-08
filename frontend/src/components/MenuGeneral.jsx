import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="menu">
      <ul>
        <li><Link to="/">Examen</Link></li>
        <li><Link to="/gestion-usuario">Gestión de Usuario</Link></li>
        <li><Link to="/historial">Historial</Link></li>
      </ul>
    </div>
  );
}

export default Menu;
