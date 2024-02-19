import { useState } from "react";
import examenService from "../../services/ServiciosExamen";
import {
  EvaluacionInformacion,
  AgregarListaEstudiantes,
  RegistrarActividadFormativa,
  PanelSeleccionarEvaluador,
} from "./indexExamen";
import { useSelector } from "react-redux";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";

export const FormularioPorPasos = () => {
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
    console.log("componentes del examen: ", componenteExamen);
  };

  const onAnteriorPanel = () => {
    setComponenteExamen((componenteExamen) => componenteExamen - 1);
    console.log("componentes del examen: ", componenteExamen);
  };

  const onEnviarFormularioExamen = async (event) => {
    event.preventDefault();
    try {
      await examenService.agregarExamen(enviarExamen);
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
              suiguiente={onSiguientePanel}
              anterior={onAnteriorPanel}
              // examenId={examenId}
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
              suiguiente={onSiguientePanel} 
              anterior={onAnteriorPanel}
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
              suiguiente={onSiguientePanel}
              anterior={onAnteriorPanel} 
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
              />
            </div>
            <div className="centrar">
              <Button
                variant="contained"
                disabled={!camposCargados}
                onClick={onEnviarFormularioExamen}
              >
                Cargar examen
              </Button>
            </div>
          </div>
        </div>
      );
    default:
      return <div>Formulario completado</div>;
  }
};
