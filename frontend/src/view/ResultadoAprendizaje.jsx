import { useEffect, useState } from "react";
import resultadoAprendizajeServicio from "../services/ServicioResultadoAprendizaje";
import { Button, TextField } from "@mui/material";
import { CrearResultadoAprendizaje } from "../components/ResultadoComponentes/ModalCrearResultadoAprendizaje";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { cambiarEstadoBoton } from "../redux/botonAlertaSlice";
import { useDispatch, useSelector } from "react-redux";
import { NotificacionCalificacion } from "../components/Evaluadores/NotificacionCalificacion";
import { Tabla } from "../components/tabla";

export const ResultadoAprendizaje = () => {
  const dispatch = useDispatch();
  const estadoAlerta = useSelector((state) => state.botonAlerta.botonAlerta);
  const alertaNotificacion = useSelector((state) => state.botonAlerta.notificacion);

  const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);
  const [filtrar, setFiltrar] = useState("");
  const [notificacionResultadoAprendizaje, setNotificacionResultadoAprendizaje] = useState(false);
  const [modalResultadoAprendizaje, setModalResultadoAprendizaje] = useState(false);

  const columnas = [
    {
      titulo: "RESULTADO APRENDIZAJE",
      ancho: "20%",
      valor: "titulo",
    },
    {
      titulo: "DESCRIPCION",
      ancho: "47%",
      valor: "descripcion",
    },
    {
      titulo: "ESTADO",
      ancho: "13%",
      valor: "estado",
    },
  ];

  const BotonesAcciones = [
    {
      icono: RadioButtonCheckedIcon,
      color: (dato) => dato.estado ? 'colorActivo' : 'colorInactivo',
      accion: (event, id) =>
        onCambiarEstado(event, id),
    }
  ];

  useEffect(() => {
    if (estadoAlerta) {
      setNotificacionResultadoAprendizaje(true);
      const timer = setTimeout(() => {
        setNotificacionResultadoAprendizaje(false);
        dispatch(
          cambiarEstadoBoton({
            botonAlerta: false,
            notificacion: "",
          })
        );
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [estadoAlerta]);

  const buscarResultadoAprendizaje = (event) => {
    setFiltrar(event.target.value);
  };

  const filteredResultados = resultadoAprendizaje.filter((resultado) =>
    resultado.titulo.toLowerCase().includes(filtrar.toLowerCase())
  );

  const abrirModal = () => {
    setModalResultadoAprendizaje(true);
  };

  const cerrarModal = () => {
    setModalResultadoAprendizaje(false);
  };

  const obtenerResultadosAprendizaje = async () => {
    try {
      const data = await resultadoAprendizajeServicio.traerResultado();
      setResultadoAprendizaje(data);
    } catch (error) {
      console.error("Error al obtener los resultados de aprendizaje:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await resultadoAprendizajeServicio.traerResultado();
        obtenerResultadosAprendizaje();
      } catch (error) {
        console.error("Error al obtener el resultado:", error);
      }
    }
    fetchData();
  }, []);

  const onCambiarEstado = async (event, resultado_Id) => {
    event.preventDefault();
    try {
      await resultadoAprendizajeServicio.cambiarEstado(resultado_Id);
      const nuevaLista = await resultadoAprendizajeServicio.traerResultado();
      setResultadoAprendizaje(nuevaLista);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div className="cabecera">
          <div>
            <h1>Resultado Aprendizaje</h1>
          </div>
          <div className="notificacionAlerta">
            <NotificacionCalificacion
              estadoAlerta={notificacionResultadoAprendizaje}
              alerta={alertaNotificacion}
            />
          </div>
        </div>
        <div className="cuerpo">
              <Button
                sx={{ height: "2.5rem" }}
                variant="contained"
                color="success"
                onClick={abrirModal}
              >
                <AddCircleOutlineIcon
                  fontSize="small"
                />
                <p className="botonAgregar">
                  Agregar Resulatado Aprendizaje
                </p>
              </Button>
              <TextField
                sx={{ width: "24rem", minWidth: "12rem" }}
                id="outlined-basic"
                placeholder="Filtrar Resultado Aprendizaje"
                variant="outlined"
                value={filtrar}
                onChange={buscarResultadoAprendizaje}
                InputProps={{
                  startAdornment: (
                    <FilterAltIcon sx={{ color: "rgba(0, 0, 0, 0.25)" }} />
                  ),
                }}
              />
        </div>
        <div className="tablascontenido">
          <Tabla
            datos={filteredResultados}
            columnas={columnas}
            acciones={BotonesAcciones}
            accinar="true"
          />
        </div>
        <CrearResultadoAprendizaje
            abierto={modalResultadoAprendizaje}
            cerrado={cerrarModal}
            tablaResultados={obtenerResultadosAprendizaje}
        />
      </div>
    </>
  );
};
