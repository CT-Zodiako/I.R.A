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

  const onNext = () => {
    setComponenteExamen((componenteExamen) => componenteExamen + 1);
    console.log("componentes del examen: ", componenteExamen);
  };

  const onAtras = () => {
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
              handleNext={onNext}
              handleLast={onAtras}
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
              handleNext={onNext} 
              handleLast={onAtras}
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
              handleNext={onNext}
              handleLast={onAtras} 
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
                handleLast={onAtras}
              />
            </div>
            <div className="centrar">
              {/* <button
                disabled={!camposCargados}
                onClick={onEnviarFormularioExamen}
              >
                Cargar examen
              </button> */}
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
