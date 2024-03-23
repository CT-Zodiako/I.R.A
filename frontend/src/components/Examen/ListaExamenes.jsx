import { useEffect, useState } from "react"
import examenService from "../../services/ServiciosExamen"
import { Button } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import { Link, useNavigate } from "react-router-dom"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { useDispatch, useSelector } from "react-redux"
import { NotificacionCalificacion } from "../Evaluadores/NotificacionCalificacion"
import { cambiarEstadoBoton } from "../../redux/botonAlertaSlice"
import { Tabla } from "../tabla"

export const ExamenesLista = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const programa = useSelector((state) => state.programa.programa);  
  const estadoAlerta = useSelector((state) => state.botonAlerta.botonAlerta);
  const alertaNotificacion = useSelector((state) => state.botonAlerta.notificacion);

  const [listaExamenes, setListaExamenes] = useState([]);  
  const [notificacionExamen, setNotificacionExamen] = useState(false);

  console.log('examenes: ', listaExamenes[3]);
  

  const columnas = [
    {
      titulo: "EXAMEN ID",
      ancho: "13%",
      valor: "id",
    },
    {
      titulo: "PROYECTO INTEGRADOR",
      ancho: "42%",
      valor: "proyecto_integrador",
    },
    {
      titulo: "EVALUADORES",
      ancho: "20%",
      valor: "nombres_evaluadores",
    },
  ];

  const BotonesAcciones = [
    {
      icono: CreateIcon,
      color: () => 'colorEditar',
      accion: (event, examenId) =>
        onEditarExamen({ accion: "editar", examenId: examenId }),
    },
    {
      icono: DeleteIcon,
      color: () => 'colorEliminar',
      accion: (event, examenId) => onEliminarExamen(event, examenId),
    },
    {
      icono: EmailIcon,
      color: () => 'colorCorreo',
      accion: (event, id) => enviarCorre(event, id),
    },
  ];

  useEffect(() => {
    if (estadoAlerta) {
      setNotificacionExamen(true);
      const timer = setTimeout(() => {
        setNotificacionExamen(false);
        dispatch(
          cambiarEstadoBoton({
            botonAlerta: false,
            notificacion: "",
          })
        );
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [estadoAlerta]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (programa) {
          const examenes = await examenService.ExamenesCreados(programa);
          setListaExamenes(examenes);
        }
      } catch (error) {
        console.error("Error al obtener la lista: ", error);
      }
    }
    fetchData();
  }, [programa]);

  const enviarCorre = async(event, id) => {
    event.preventDefault();
      try {
        await examenService.correoEvaluadores(id);
        console.log('se envio el correo a los evaludores');
        dispatch(
          cambiarEstadoBoton({
            botonAlerta: true,
            notificacion: "Se notifico a los evaluadores del examen",
          }),
        );
          const nuevaListaExamen = await examenService.ExamenesCreados(programa);
          console.log('nueva lista examenes', nuevaListaExamen);
          setListaExamenes(nuevaListaExamen);
      } catch (error) {
        console.error("Error al enviar los correos: ", error);
      }
  };

  const onEliminarExamen = async (event, examenId) => {
    event.preventDefault();
    try {
      await examenService.eliminarExamen(examenId);
      const nuevaListaExamen = await examenService.ExamenesCreados(programa);
      setListaExamenes(nuevaListaExamen);
    } catch (error) {
      console.error(error);
    }
  };

  const onEditarExamen = ({ accion, examenId }) => {
    navigate(`/editar_examen`, {
      state: {
        accion: accion,
        examenId: examenId,
      },
    });
  };

  return (
    <>
      <div>
        <div className="cabecera">
          <div>
            <h1>Lista Examenes Creados</h1>
          </div>
          <div className="notificacionAlerta">
              <NotificacionCalificacion
                estadoAlerta={notificacionExamen}
                alerta={alertaNotificacion}
              />
            </div>
        </div>
        <div className="cuerpo">
          <Button 
            sx={{ height: "2.5rem" }}
            variant="contained" 
            color="success" 
            size="small"
          >
            <AddCircleOutlineIcon fontSize="small" />
            <Link to="/pasos" className="botonAgregar">
              Crear Examen
            </Link>
          </Button>
        </div>
        <div className="tablascontenido">
          <Tabla
            datos={listaExamenes}
            columnas={columnas}
            // editar={onEditarExamen}
            // eliminar={onEliminarExamen}
            // enviarCorreo={enviarCorre}
            acciones={BotonesAcciones}
            accinar='true'
          />
        </div>
      </div>
    </>
  );
};
