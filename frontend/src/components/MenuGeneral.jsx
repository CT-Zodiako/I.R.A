import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { InputSeleccion } from './EtiquetaSeleccionGeneral'
import programaServicio from '../services/ServicioPrograma' 
import { agregarPrograma } from '../redux/programaSlice'
import { Button } from '@mui/material'
import OutputIcon from '@mui/icons-material/Output';

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
        <div className='usuarioRolMenu'>
          {rol === 'Admin'? 
          <h2>Bienvenido Administrador</h2> : 
          <h2>Bienvenido Evaluador</h2>}
        </div>
        <div style={{ height: "60%", display: 'flex', alignContent: 'start' }}>
          <nav>
            <ul>
              {rol === 'Admin'&&(
                <>
                  <li className='opcionesMenu'><Link to="/lista_examen">Examenes</Link></li>
                  <li className='opcionesMenu'><Link to="/resultado-aprendizaje">Resultados de Aprendizaje</Link></li>
                  <li className='opcionesMenu'><Link to="/evaluadores">Gestión de Usuario</Link></li>
                  <li className='opcionesMenu'><Link to="/informe_examen">Informes</Link></li>
                  <li  style={{marginTop: '1.5rem'}}>
                    <div className="programaSelec">
                      <InputSeleccion
                        fondo="white"
                        seleccionar={selecPrograma}
                        idSeleccion={onPrograma}
                        label="Seleccione Programa"
                        variable="nombre"
                        anchoSelec='14rem'
                      />
                    </div>
                  </li>
                </>
              )}
              {rol === 'Evaluador' &&(
                <>
                  <li style={{ padding: "12px" }}><Link to="/lista_examenes">Bandeja de examenes</Link> </li>
                </>
              )}
            </ul>         
          </nav>
        </div>
        <div style={{ height: "20%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button 
            sx={{ width: '12rem', height: '2.5rem' }}
            variant='contained'
            color='error'
          >
            <OutputIcon sx={{ marginRight: "0.5rem" }}/>
            Cerrar Sesión
          </Button>
        </div>
    </div>
  );
}

export default Menu;
