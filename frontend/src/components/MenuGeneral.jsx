import React from 'react';
import { Link } from 'react-router-dom';

const MenuLateral = () => {
  return (
    <div className="menu-lateral">
      <ul>
        <li>
          <Link to="/examen">Examen</Link>
        </li>
        <li>
          <Link to="/gestion-usuario">Gestión de Usuario</Link>
        </li>
        <li>
          <Link to="/historial">Historial</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuLateral;