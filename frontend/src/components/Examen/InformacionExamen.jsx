import { useState, useEffect } from "react";
import { InputSeleccion } from "../EtiquetaSeleccionGeneral";
import { useDispatch, useSelector } from "react-redux";
import { LimpiarExamen, agregaInformacion } from "../../redux/examenSlice";
import programaServicio from "../../services/ServicioPrograma";
import examenService from "../../services/ServiciosExamen";
import resultadoAprendizajeServicio from "../../services/ServicioResultadoAprendizaje";
import "./examen.css";
import { InputLabel, TextField } from "@mui/material";
import { BotonGeneral } from "../botonGeneral";
import { BotonRegresar } from "./botonRegresar";
import { useNavigate } from "react-router-dom";

export const EvaluacionInformacion = ({
  siguiente,
  examenId,
  accion,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const programaStado = useSelector((state) => state.programa.programa);
  const infoExamenStore = useSelector((state) => state.examenFormulario);

  const [informacionExamen, setInformacionExamen] = useState({
    programa_id: infoExamenStore.programa_id,
    resultado_aprendizaje_id: infoExamenStore.resultado_aprendizaje_id,
    proyecto_integrador: infoExamenStore.proyecto_integrador,
  });
  const [programa, setPrograma] = useState([]);
  const programaU = programa.find((item) =>
    item.id === programaStado ? item.nombre : null
  );
  const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);  
  const [camposCargados, setCamposCargados] = useState(false);

  const regresarPanelExamen = () => {
    dispatch(
      LimpiarExamen()
    ),
    navigate('/lista_examen');
  };

  useEffect(() => {
    setInformacionExamen({
      ...informacionExamen,
      programa_id: programaStado,
    });
  }, [programaStado]);

  const onResultado = (seleccionId) => {
    setInformacionExamen({
      ...informacionExamen,
      resultado_aprendizaje_id: seleccionId,
      programa_id: programaStado,
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
        const data =
          await resultadoAprendizajeServicio.traerResultadoByEstado();
        setResultadoAprendizaje(data);
      } catch (error) {
        console.error("Error al obtener el resultado:", error);
      }
    }
    fetchData();
  }, []);

  if (accion === "editar") {
    useEffect(() => {
      async function fetchData() {
        try {
          const responce = await examenService.examenPorId(examenId);
          setInformacionExamen({
            ...informacionExamen,
            programa_id: responce.programa_id,
            resultado_aprendizaje_id: responce.resultado_aprendizaje_id,
            proyecto_integrador: responce.proyecto_integrador,
          });
        } catch (error) {
          console.error(
            "No se puedo obtener la informacion del examen: ",
            error
          );
        }
      }
      fetchData();
    }, []);
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
    siguiente();
  };

  return (
    <>
      <div>
        <div className="botonRegresar">
          <BotonRegresar 
            regresar={regresarPanelExamen} 
          />
        </div>
        <div className="informacion">
          <h3>Panel Informacion del Examen</h3>
          <div style={{ width: '25rem' }}>
            <p style={{ textAlign: 'justify' }}>
              En este panel se debe ingresar la información del examen que se va a crear al resultado de aprendizaje a evaluar. Recuerde seleccionar el programa.            
            </p>
          </div>
          <form onSubmit={onEnviarInformacion}>
            <div className="componentes">
              <div className="informacionExamen" style={{ height: "4rem" }}>
                <InputLabel id="demo-simple--label">Programa: </InputLabel>
                <TextField
                  sx={{ width: "20rem", margin: "10px" }}
                  value={programaU
                    ? programaU.nombre
                    : programa.filter((index) =>
                        index.id === informacionExamen.programa_id
                          ? index.nombre
                          : null
                  )}
                  InputProps={{
                    readOnly: true
                  }}
                />
              </div>
              <div className="informacionExamen" style={{ marginTop: '1.5rem' }}>
                <InputLabel id="demo-simple--label">Resultado:</InputLabel>
                <InputSeleccion
                  seleccionar={resultadoAprendizaje}
                  idSeleccion={onResultado}
                  label="Seleccione resultado aprendizaje"
                  variable="titulo"
                  onvalue={informacionExamen.resultado_aprendizaje_id}
                  anchoSelec="20rem"
                />
                <div style={{ height: '5rem', width: '21rem' }}>
                  <p
                    style={{ textAlign: 'justify' }}
                  >
                    {(()=>{
                      const resultado = resultadoAprendizaje.find((resultado) => resultado.id === informacionExamen.resultado_aprendizaje_id);
                      if(resultado){
                        return resultado.descripcion;
                      }
                    })()}
                  </p>
                </div>
              </div>
              <div className="informacionExamen">
                <InputLabel id="demo-simple--label">
                  Proyecto Integrador:{" "}
                </InputLabel>
                <TextField
                  sx={{ width: "20rem", margin: "10px" }}
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
                tipo="submit"
                accion="Cargar"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
