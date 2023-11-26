import { useState, useEffect } from "react"
import { InputSeleccion } from "../EtiquetaSeleccionGeneral"
import { useDispatch } from "react-redux"
import { agregaInformacion } from "../../redux/examenSlice"
import programaServicio from "../../services/ServicioPrograma"
import examenService from "../../services/ServiciosExamen"
import resultadoAprendizajeServicio from "../../services/ServicioResultadoAprendizaje"
import "./examen.css"
import { InputLabel, TextField } from "@mui/material"
import { BotonGeneral } from "../botonGeneral"

export const EvaluacionInformacion = ({ handleNext, examenId, accion }) => {  
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

  if(accion === 'editar'){
    useEffect(()=>{
      async function fetchData() {
        try{
          const responce = await examenService.examenPorId(examenId);
          setInformacionExamen({
            ...informacionExamen,
            programa_id: responce.programa_id,
            resultado_aprendizaje_id: responce.resultado_aprendizaje_id,
            proyecto_integrador: responce.proyecto_integrador
          })
        } catch (error) {
          console.error("No se puedo obtener la informacion del examen: ", error);
        }
      }
      fetchData()
    }, [])
  }

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
                onvalue={informacionExamen.programa_id}
              />
            </div>
            <div>
              <InputLabel id="demo-simple--label">Resultado: </InputLabel>
              <InputSeleccion
                seleccionar={resultadoAprendizaje}
                idSeleccion={onResultado}
                label="seleccione resultado"
                variable="titulo"
                onvalue={informacionExamen.resultado_aprendizaje_id}
              />
            </div>
            <div>
              <InputLabel id="demo-simple--label">
                Proyecto Integrador:{" "}
              </InputLabel>
              <TextField
                sx={{width: '20rem', margin: '10px'}}
                id="outlined-multiline-static"
                type="text"
                label="Descripción"
                name="proyecto_integrador"
                value={informacionExamen.proyecto_integrador}
                onChange={onProyectoIntegrador}
                multiline
                rows={4}
              />
            </div>
          </div>
          <div>
            <BotonGeneral
                camposCargados={camposCargados}
                tipo='submit'
                accion='Cargar'
            />
          </div>
        </form>
      </div>
    </>
  );
};
