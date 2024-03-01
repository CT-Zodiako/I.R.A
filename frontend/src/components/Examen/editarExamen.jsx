import { useState } from "react";
import examenService from "../../services/ServiciosExamen";
import {
  EvaluacionInformacion,
  AgregarListaEstudiantes,
  RegistrarActividadFormativa,
  PanelSeleccionarEvaluador,
} from "./indexExamen";
import { useSelector } from "react-redux";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useLocation } from "react-router-dom";

export const EditarExamen = () => {
  const location = useLocation();
  const accion = location.state.accion;
  const examenId = location.state.examenId;

  const enviarExamen = useSelector((state) => state.examenFormulario);
  
  const [componenteExamen, setComponenteExamen] = useState(1);
  const [camposCargados, setCamposCargados] = useState(false);

  const pasos = [
    "Informacion Examen",
    "Panel Evaluador",
    "Actividades Formativas",
    "Estudiantes Examen",
  ];

  const onSiguientePanel = () => {
    setComponenteExamen((componenteExamen) => componenteExamen + 1);
  };

  const onAnteriorPanel = () => {
    setComponenteExamen((componenteExamen) => componenteExamen - 1);
  };

  const onEnviarEditarExamen = async (event) => {
    event.preventDefault();
    try {
      await examenService.editarExamen(examenId, enviarExamen);
    } catch (error) {
      console.error("Error al enviar los datos del examen:", error);
    }
  };

  switch (componenteExamen) {
    case 1:
      return (
        <div>
          <div>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={componenteExamen - 1} alternativeLabel>
                {pasos.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
          <div className="centrar">
            <EvaluacionInformacion 
              siguiente={onSiguientePanel}
              anterior={onAnteriorPanel}
              examenId={examenId}
              accion={accion}
            />
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <div>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={componenteExamen - 1} alternativeLabel>
                {pasos.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
          <div className="centrar">
            <PanelSeleccionarEvaluador
                siguiente={onSiguientePanel}
                anterior={onAnteriorPanel}
                examenId={examenId}
                accion={accion}
            />
          </div>
        </div>
      );
    case 3:
      return (
        <div>
          <div>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={componenteExamen - 1} alternativeLabel>
                {pasos.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
          <div className="centrar">
            <RegistrarActividadFormativa 
                siguiente={onSiguientePanel}
                anterior={onAnteriorPanel}
                examenId={examenId}
                accion={accion}
            />
          </div>
        </div>
      );
    case 4:
      return (
        <div>
          <div>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={componenteExamen - 1} alternativeLabel>
                {pasos.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
          <div>
            <div className="centrar">
              <AgregarListaEstudiantes 
                setCamposCargados={setCamposCargados}
                anterior={onAnteriorPanel}
                examenId={examenId}
                accion={accion}
              />
            </div>
            <div className="centrar">
              <button
                disabled={!camposCargados}
                onClick={onEnviarEditarExamen}
              >
                Cargar examen
              </button>
            </div>
          </div>
        </div>
      );
    default:
      return <div>Formulario completado</div>;
  }
};
