import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Menu = () => {
  const rol = useSelector(state => state.sesion.rol);
  console.log(rol);
  return (
    <div className="menu">
      <ul>
        {rol === 'Admin'&&(
          <>
            <li><Link to="/examen">Examen</Link></li>
            <li><Link to="/evaluadores">Gestión de Usuario</Link></li>
            <li><Link to="/resultado-aprendizaje">Historial</Link></li>
            <li><Link to="/informe_examen">Informes</Link></li>
          </>
        )}
        {rol === 'Evaluador' &&(
          <>
            <li><Link to="/lista_examenes">Bandeja de examenes</Link> </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Menu;
