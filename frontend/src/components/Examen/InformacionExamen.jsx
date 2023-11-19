import { useState, useEffect } from "react";
import { InputSeleccion } from "../EtiquetaSeleccionGeneral";
import { useDispatch } from "react-redux";
import { agregaInformacion } from "../../redux/examenSlice";
import programaServicio from "../../services/ServicioPrograma";
import resultadoAprendizajeServicio from "../../services/ServicioResultadoAprendizaje";
import "./examen.css";
import { InputLabel, TextField } from "@mui/material";

export const EvaluacionInformacion = ({ handleNext }) => {
  const dispatch = useDispatch();
  const [informacionExamen, setInformacionExamen] = useState({
    programa_id: "",
    resultado_aprendizaje_id: "",
    proyecto_integrador: "",
  });
  const [programa, setPrograma] = useState([]);
  const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);
  const [camposCargados, setCamposCargados] = useState(false);

  const onPrograma = (seleccionId) => {
    setInformacionExamen({
      ...informacionExamen,
      programa_id: seleccionId,
    });
  };

  const onResultado = (seleccionId) => {
    setInformacionExamen({
      ...informacionExamen,
      resultado_aprendizaje_id: seleccionId,
    });
  };

  const onProyectoIntegrador = (event) => {
    const { name, value } = event.target;
    setInformacionExamen({
      ...informacionExamen,
      [name]: value,
    });
  };

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
    async function fetchData() {
      try {
        const data = await resultadoAprendizajeServicio.traerResultado();
        setResultadoAprendizaje(data);
      } catch (error) {
        console.error("Error al obtener el resultado:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const camposCargados =
      informacionExamen.programa_id &&
      informacionExamen.resultado_aprendizaje_id &&
      informacionExamen.proyecto_integrador;

    setCamposCargados(camposCargados);
  }, [informacionExamen]);

  const onEnviarInformacion = (event) => {
    event.preventDefault();
    dispatch(
      agregaInformacion({
        programa_id: informacionExamen.programa_id,
        resultado_aprendizaje_id: informacionExamen.resultado_aprendizaje_id,
        proyecto_integrador: informacionExamen.proyecto_integrador,
      })
    );
    handleNext();
  };

  return (
    <>
      <div className="informacion">
        <form onSubmit={onEnviarInformacion}>
          <div className="componentes">
            <div>
              <InputLabel id="demo-simple--label">Programa: </InputLabel>
              <InputSeleccion
                className="inputExamen"
                seleccionar={programa}
                idSeleccion={onPrograma}
                label="seleccione programa"
                variable="nombre"
              />
            </div>
            <div>
              <InputLabel id="demo-simple--label">Resultado: </InputLabel>
              <InputSeleccion
                seleccionar={resultadoAprendizaje}
                idSeleccion={onResultado}
                label="seleccione resultado"
                variable="titulo"
              />
            </div>
            <div>
              <InputLabel id="demo-simple--label">
                Proyecto Integrador:{" "}
              </InputLabel>
              <TextField
                sx={{width: '21rem'}}
                id="outlined-multiline-static"
                type="text"
                label="Descripción actividad"
                name="proyecto_integrador"
                value={informacionExamen.proyecto_integrador}
                onChange={onProyectoIntegrador}
                multiline
                rows={8}
                defaultValue="Default Value"
              />
              {/* <input
                type="text"
                name="proyecto_integrador"
                value={informacionExamen.proyecto_integrador}
                onChange={onProyectoIntegrador}
              /> */}
            </div>
          </div>
          <div>
            <button type="submit" disabled={!camposCargados}>
              Cargar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
