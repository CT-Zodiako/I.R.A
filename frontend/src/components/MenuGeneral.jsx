import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { InputSeleccion } from './EtiquetaSeleccionGeneral'
import programaServicio from '../services/ServicioPrograma' 
import { agregarPrograma } from '../redux/programaSlice'
import { Button } from '@mui/material'
import OutputIcon from '@mui/icons-material/Output';

export const  Menu = ({ onCerrarSesion }) => {
  const dispatch = useDispatch();
  // const usuario = useSelector((state) => state.sesion.username);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [rol, setRol] = useState();
  const [selecPrograma, setSelecPrograma] = useState([]);

  const onPrograma = (seleccionId) => {
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
    if (token) {
      const tokenData = token.split(".")[1];
      const decodedToken = JSON.parse(atob(tokenData));
      if (decodedToken) {
        const rolUsuario = decodedToken.sub.rol;
        setRol(rolUsuario);
      }
    }
  }, []);

  return (
    <div className="menu">
        <div className='usuarioRolMenu'>
          { rol === 'Admin' ?
              <h2>Bienvenido Administrador</h2>:
              <h2>Bienvenido Evaluador</h2>
          }
        </div>
        <div style={{ height: "60%", display: 'flex', alignContent: 'start' }}>
          <nav>
            <ul>
              {rol === 'Admin' &&(
                <>
                  <Link to="/lista_examen" className='enlacesMenu'><li className='opcionesMenu'>Examen</li></Link>
                  <Link to="/resultado-aprendizaje" className='enlacesMenu'><li className='opcionesMenu'>Resultados de Aprendizaje</li></Link>
                  <Link to="/evaluadores" className='enlacesMenu'><li className='opcionesMenu'>Gestión de Usuario</li></Link>
                  <Link to="/informe_examen" className='enlacesMenu'><li className='opcionesMenu'>Informes</li></Link>
                    <h4 style={{ marginLeft: "0.8rem" }}>Programa:</h4>
                    <div className="programaSelec">
                      <InputSeleccion
                        fondo="white"
                        seleccionar={selecPrograma}
                        idSeleccion={onPrograma}
                        label="Seleccione Programa"
                        variable="nombre"
                        anchoSelec='13rem'
                        alto='3rem'
                        tamano='14px'
                      />
                    </div>
                </>
              )}
              {rol === 'Evaluador' &&(
                <>
                  <Link to="/lista_examenes" className='enlacesMenu'><li className='opcionesMenu'>Bandeja de examenes</li></Link>
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
            onClick={onCerrarSesion}
          >
            <OutputIcon sx={{ marginRight: "0.5rem" }}/>
            Cerrar Sesión
          </Button>
        </div>
    </div>
  );
}

export default Menu;
