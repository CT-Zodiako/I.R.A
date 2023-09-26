import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="menu">
      <ul>
        <li><Link to="/examen">Examen</Link></li>
        <li><Link to="/evaluadores">Gestión de Usuario</Link></li>
        <li><Link to="/resultado-aprendizaje">Historial</Link></li>
      </ul>
    </div>
  );
}

export default Menu;
