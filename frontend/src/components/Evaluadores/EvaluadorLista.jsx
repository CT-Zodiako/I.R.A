import { useEffect, useState } from "react";
import evaluadorService from "../../services/servicioEvaluador";
import { Button } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear'
import CreateIcon from '@mui/icons-material/Create'
import { ModalIRA } from "../Examen/ModalEditarEvaluador"
import { ModalCrearEvaluador } from "./ModalCrearEvaluador"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useDispatch, useSelector } from "react-redux";
import { cambiarEstadoBoton } from "../../redux/botonAlertaSlice";
import { NotificacionCalificacion } from "./NotificacionCalificacion";
import { Tabla } from "../tabla";

export const EvaluadorLista = () => {
  const dispatch = useDispatch();
  const estadoAlertaNotificacion = useSelector((state) => state.botonAlerta.botonAlerta);

  const [evaluadores, setEvaluadores] = useState([]);
  const [modalAbiertoCrear, setModalAbiertoCrear] = useState(false);
  const [modalAbiertoEditar, setModalAbiertoEditar] = useState(false);
  const [evaluadorIdSeleccionado, setEvaluadorIdSeleccionado] = useState(null);
  const [notificacionEvaluador, setNotificacionEvaluador] = useState(false);

  const columnas = [
    {
      titulo: "NOMBRE EVALUADOR",
      ancho: "23%",
      valor: "nombre_evaluador",
    },
    {
      titulo: "CORREO",
      ancho: "24%",
      valor: "correo",
    },
    {
      titulo: "TELEFONO",
      ancho: "14%",
      valor: "telefono",
    },
    {
      titulo: "IDENTIFICACION",
      ancho: "15%",
      valor: "numero_identificacion",
    },
    {
      titulo: "ESTADO",
      ancho: "10%",
      valor: "estado",
    },
  ];

  const BotonesAcciones = [
    {
      icono: CreateIcon,
      color: () => 'colorEditar',
      accion: (event, evaluadorId) => abrirModalEditar(evaluadorId),
    },
    {
      icono: ClearIcon,
      color: () => 'colorEliminar',
      accion: (event, evaluadorId) => onEliminarEvaluador(event, evaluadorId),
    },
  ];

  useEffect(() => {
    if (estadoAlertaNotificacion) {
      setNotificacionEvaluador(true);
      const timer = setTimeout(() => {
        setNotificacionEvaluador(false);
        dispatch(
          cambiarEstadoBoton({
            botonAlerta: false,
          })
        );
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [estadoAlertaNotificacion]);

  const abrirModalCrear = () => {
    setModalAbiertoCrear(true);
  };

  const cerrarModalCrear = () => {
    setModalAbiertoCrear(false);
    actualizarTabla()
  };
  
  const abrirModalEditar = (evaluadorId) => {
    setEvaluadorIdSeleccionado(evaluadorId);
    setModalAbiertoEditar(true);
  };

  const cerrarModalEditar = () => {
    setEvaluadorIdSeleccionado(null);
    setModalAbiertoEditar(false);
    actualizarTabla()
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await evaluadorService.traerEvaluador();
        setEvaluadores(data);
      } catch (error) {
        console.error("Error al obtener el resultado:", error);
      }
    }
    fetchData();
  }, []);

  const onEliminarEvaluador = async (event, evaluador_Id) => {
    event.preventDefault();
    try {
      await evaluadorService.eliminarEvaluador(evaluador_Id);
      const nuevaListaEvaluador = await evaluadorService.traerEvaluador();
      setEvaluadores(nuevaListaEvaluador);
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarTabla = async () => {
    try {
      const data = await evaluadorService.traerEvaluador();
      setEvaluadores(data);
    } catch (error) {
      console.error("Error al obtener el resultado:", error);
    }
  };

  return (
    <>
      <div>
        <div className="cabecera">
          <div>
            <h1>Gestion de Usuarios</h1>
          </div>
          <div className="notificacionAlerta">
            <NotificacionCalificacion
              estadoAlerta={notificacionEvaluador}
              alerta="Resultado Aprendizaje Agregado"
            />
          </div>
        </div>
        <div className="cuerpo">
          <Button
            sx={{ height: "2.5rem" }}
            variant="contained"
            color="success"
            size="small"
            onClick={ abrirModalCrear }
          >
            <AddCircleOutlineIcon 
              fontSize="small" 
            />
            <p className="botonAgregar">
              Agregar Evaluador
            </p>
          </Button>
        </div>
        <div className="tablascontenido">
          <Tabla
            datos={evaluadores}
            columnas={columnas}
            eliminar={onEliminarEvaluador}
            editar={abrirModalEditar}
            acciones={BotonesAcciones}
            accinar='true'
          />
        </div>
      </div>
      <ModalIRA
        isOpen={modalAbiertoEditar}
        onClose={cerrarModalEditar}
        evaluadorId={evaluadorIdSeleccionado}
      />
      <ModalCrearEvaluador
        isOpen={modalAbiertoCrear}
        onClose={cerrarModalCrear}
      />
    </>
  );
};
