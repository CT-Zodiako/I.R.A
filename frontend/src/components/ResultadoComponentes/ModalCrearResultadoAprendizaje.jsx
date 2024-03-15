import { useEffect, useState } from "react";
import resultadoAprendizajeServicio from "../../services/ServicioResultadoAprendizaje" 
import programaServicio from '../../services/ServicioPrograma' 
import {
  Box,
  Button,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
// import { InputSeleccion } from "../EtiquetaSeleccionGeneral";
import { cambiarEstadoBoton } from "../../redux/botonAlertaSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CrearResultadoAprendizaje = ({ abierto, cerrado, tablaResultados }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [agregaResultado, setAgregaResultado] = useState({
    titulo: "",
    // programa: "",
    descripcion: "",
  });
  // const [programa, setPrograma] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await programaServicio.traerPrograma();
        setPrograma(data);
      } catch (error) {
        console.error("Error al obtener el programa:", error);
      }
    }
    fetchData();
  }, []);

  // const onPrograma = (seleccionId) => {
  //   setAgregaResultado({
  //     ...agregaResultado,
  //     programa: seleccionId,
  //   });
  // }

  const onAgregarResultado = (event) => {
    const { name, value } = event.target;
    setAgregaResultado({
      ...agregaResultado,
      [name]: value,
    });
  };

  const onEnviarResultado = async (event) => {
    event.preventDefault();
    try {
      await resultadoAprendizajeServicio.agregarResultado(agregaResultado);
      dispatch(
        cambiarEstadoBoton({
          botonAlerta: true,
          notificacion: "Resultado de Aprendizaje Creado",
        }),
      );
      navigate('/resultado-aprendizaje');
      cerrado();
    } catch (error) {
      console.error(error);
    }
    tablaResultados();
  };

  return (
    <>
      <Modal
        open={abierto}
        onClose={cerrado}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <div className="modales">
            <form onSubmit={onEnviarResultado}>
              <div className="componentes">
                <div className="centrar">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Crear Resultado de Aprendizaje
                  </Typography>
                </div>
                <div className="">
                  <div className="">
                    <InputLabel id="demo-simple--label">Titulo: </InputLabel>
                  </div>
                  <div>
                    <TextField
                      type="text"
                      name="titulo"
                      value={agregaResultado.titulo}
                      onChange={onAgregarResultado}
                      id="outlined-basic"
                      label="titulo"
                      required
                    />
                  </div>
                </div>
                {/* <div className="">
                  <div className="">
                    <InputLabel id="demo-simple--label">Programa: </InputLabel>
                  </div>
                  <div>
                    <InputSeleccion
                        seleccionar={programa}
                        idSeleccion={onPrograma}
                        label="Seleccione Programa"
                        variable="nombre"
                        anchoSelec='14rem'
                        alto='3.2rem'
                      />
                  </div>
                </div> */}
                <div className="">
                  <div className="">
                    <InputLabel id="demo-simple--label">Descripcion: </InputLabel>
                  </div>
                  <div>
                    <TextField
                      type="text"
                      name="descripcion"
                      value={agregaResultado.descripcion}
                      onChange={onAgregarResultado}
                      id="outlined-basic"
                      label="descripcion"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="centrar">
                <Button 
                  type="submit" 
                  variant="contained"
                >
                  Crear
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
