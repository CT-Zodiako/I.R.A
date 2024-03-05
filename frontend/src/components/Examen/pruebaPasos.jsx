import { useState } from "react";
import examenService from "../../services/ServiciosExamen";
import {
  EvaluacionInformacion,
  AgregarListaEstudiantes,
  RegistrarActividadFormativa,
  PanelSeleccionarEvaluador,
} from "./indexExamen";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { cambiarEstadoBoton } from "../../redux/botonAlertaSlice";

export const FormularioPorPasos = () => {
  const enviarExamen = useSelector((state) => state.examenFormulario);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onEnviarFormularioExamen = async (event) => {
    event.preventDefault();
    try {
      await examenService.agregarExamen(enviarExamen);
      dispatch(
        cambiarEstadoBoton({
          botonAlerta: true,
        }),
      );
      navigate('/lista_examen');
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
