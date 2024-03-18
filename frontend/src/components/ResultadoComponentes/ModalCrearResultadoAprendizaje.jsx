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
import { cambiarEstadoBoton } from "../../redux/botonAlertaSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CrearResultadoAprendizaje = ({ abierto, cerrado, tablaResultados }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const programaStado = useSelector((state) => state.programa.programa);  

  const [agregaResultadoAprendizaje, setAgregaResultadoAprendizaje] = useState({
    titulo: "",
    programa_id: "",
    descripcion: "",
  });  
  const [programa, setPrograma] = useState([]);
  
  const programaR = programa.find((program) => program.id == programaStado);
  

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

  useEffect(() => {
    setAgregaResultadoAprendizaje({
      ...agregaResultadoAprendizaje,
      programa_id: programaStado,
    });
  }, [programaStado]);

  const onAgregarResultado = (event) => {
    const { name, value } = event.target;
    setAgregaResultadoAprendizaje({
      ...agregaResultadoAprendizaje,
      [name]: value,
    });
  };

  const onEnviarResultado = async (event) => {
    event.preventDefault();
    try {
      await resultadoAprendizajeServicio.agregarResultado(agregaResultadoAprendizaje);
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
                      value={agregaResultadoAprendizaje.titulo}
                      onChange={onAgregarResultado}
                      id="outlined-basic"
                      label="titulo"
                      required
                    />
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <InputLabel id="demo-simple--label">Programa: </InputLabel>
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "20rem", margin: "10px" }}
                      value={programaR ? programaR.nombre : ''}
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <InputLabel id="demo-simple--label">Descripcion: </InputLabel>
                  </div>
                  <div>
                    <TextField
                      type="text"
                      name="descripcion"
                      value={agregaResultadoAprendizaje.descripcion}
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
