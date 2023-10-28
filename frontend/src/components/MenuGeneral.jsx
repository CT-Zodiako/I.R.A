import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="menu">
      <ul>
        <li><Link to="/examen">Examen</Link></li>
        <li><Link to="/evaluadores">Gestión de Usuario</Link></li>
        <li><Link to="/resultado-aprendizaje">Historial</Link></li>
        <li><Link to="/lista_examenes">Bandeja de examenes</Link> </li>
        <li><Link to="/informe_examen">Informes</Link></li>
        <li><Link to="/grafica-informe">Grafico</Link></li>
      </ul>
    </div>
  );
}

export default Menu;
