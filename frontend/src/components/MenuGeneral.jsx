import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate  } from 'react-router-dom';
import { InputSeleccion } from './EtiquetaSeleccionGeneral';
import programaServicio from '../services/ServicioPrograma' 
import { FormControl, InputLabel } from '@mui/material';
import { agregarPrograma } from '../redux/programaSlice';

export const  Menu = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [rol, setRol] = useState(null);
  const [selecPrograma, setSelecPrograma] = useState([]);

  const onPrograma = (seleccionId) => {
    console.log("seleccion del programa: ",seleccionId);
    dispatch(
      agregarPrograma({
        programa: seleccionId
      })
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await programaServicio.traerPrograma();
        setSelecPrograma(data);
      } catch (error) {
        console.error("Error al obtener el programa:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Obtén el token del localStore
    const token = localStorage.getItem("token");

    const tokenData = token.split(".")[1];
    const decodedToken = JSON.parse(atob(tokenData));
    // Decodifica el token
    if (decodedToken) {
      // Obtén el rol del token
      setRol(decodedToken.sub.rol);
    }
  }, []);

  useEffect(() => {
    // Verifica si el token ha cambiado
    const tokenActual = localStorage.getItem("token");
    if (tokenActual !== token) {
      console.log("Token actualizado", tokenActual);
      // Cierra la sesión
      setToken(null);
    }
  }, []);

  // const rol = useSelector(state => state.sesion.rol);
  // console.log("rol del Usuario en el menu: ",rol);

  return (
    <div className="menu">
      <div>
        <nav>
          <ul>
            {rol === 'Admin'&&(
              <>
                <li><Link to="/lista_examen">Examenes</Link></li>
                <li><Link to="/examen">Examen</Link></li>
                <li><Link to="/informe_examen">Informes</Link></li>
                <li><Link to="/resultado-aprendizaje">Resultados de Aprendizaje</Link></li>
                <li><Link to="/evaluadores">Gestión de Usuario</Link></li>
                <li><Link to="/pasos">Examen por pasos</Link></li>
                <li style={{marginTop: '3rem'}}>
                  <div className="programaSelec">
                    <InputSeleccion
                      // className="programa"
                      fondo="white"
                      seleccionar={selecPrograma}
                      idSeleccion={onPrograma}
                      label="Programa"
                      variable="nombre"
                      anchoSelec='14rem'
                    />
                  </div>
                </li>
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
