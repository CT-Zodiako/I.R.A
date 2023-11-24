import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate  } from 'react-router-dom';
import { InputSeleccion } from './EtiquetaSeleccionGeneral';
import programaServicio from '../services/ServicioPrograma' 

export const  Menu = () => {
  // const [programa, setPrograma] = useState([]);
  
  // const navigate = useNavigate();
  // const [rol, setRol] = useState('');

  // useEffect(() => {
  //   try {
  //     const token = localStorage.getItem('token');

  //     const tokenData = token.split(".")[1];
  //     const decodedToken = JSON.parse(atob(tokenData));
  
  //     if (decodedToken) {
  //       const rol = decodedToken.sub.rol;
  //       setRol(rol);
  //       console.log("el rol de inicio de sesión: ", rol);
  //     }
  //   } catch (error) {
  //     console.error('Error al decodificar o procesar el token:', error);
  //   }
  // }, []);

  // const cerrarSesion = () => {
  //   localStorage.removeItem('token');
  //   navigate('/');
  // };


  const rol = useSelector(state => state.sesion.rol);
  console.log("rol del Usuario en el menu: ",rol);

  return (
    <div className="menu">
      <div>
        <nav>
          <ul>
            {rol === 'Admin'&&(
              <>
                <li><Link to="/">Examenes</Link></li>
                <li><Link to="/examen">Examen</Link></li>
                <li><Link to="/informe_examen">Informes</Link></li>
                <li><Link to="/resultado-aprendizaje">Resultados de Aprendizaje</Link></li>
                <li><Link to="/evaluadores">Gestión de Usuario</Link></li>
                <li><Link to="/pasos">Examen por pasos</Link></li>
              </>
            )}
            {rol === 'Evaluador' &&(
              <>
                <li><Link to="/lista_examenes">Bandeja de examenes</Link> </li>
              </>
            )}
          </ul>         
        </nav>
        <div>
          {/* <button onClick={cerrarSesion}>Cerrar Sesión</button> */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
