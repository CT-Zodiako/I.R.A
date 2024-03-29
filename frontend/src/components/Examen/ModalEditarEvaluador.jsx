import { useState, useEffect } from "react";
import evaluadorService from "../../services/servicioEvaluador";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

export const ModalIRA = ({ isOpen, onClose, evaluadorId }) => {
  const [formulario, setFormulario] = useState({
    nuevo_nombre_evaluador: '',
    nuevo_correo: '',
    nuevo_numero_identificacion: '',
    nueva_contrasena: '',
    nuevo_telefono: ''
  });

  useEffect(() => {
    const obtenerEvaluador = async () => {
      try {
        if (evaluadorId) {
          const response = await evaluadorService.obtenerEvaluador(evaluadorId);
          setFormulario({
            ...formulario,
            nuevo_nombre_evaluador: response.nombre_evaluador,
            nuevo_correo: response.correo,
            nuevo_numero_identificacion: response.numero_identificacion,
            nuevo_telefono: response.telefono
          });
          console.log("evaluador: ", response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    obtenerEvaluador();
  }, [evaluadorId]);

  const onEditarEvaluador = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const onEnviarEdicionEvaluador = async (event) => {
    event.preventDefault();
    try {
      const response = await evaluadorService.editarEvaluador(
        evaluadorId,
        formulario
      );
      console.log(response);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <div className="modales">
          <form onSubmit={onEnviarEdicionEvaluador}>
            <div>
              <div className="centrar">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Actualizar Información Evaluador
                </Typography>
              </div>
              <div>
                <div className="editar">
                  <div className="editarLabel">
                    <InputLabel id="demo-simple--label">Nombre evaluador: </InputLabel>
                  </div>
                  <div>
                    <TextField
                      id="outlined-basic"
                      type="text"
                      name="nuevo_nombre_evaluador"
                      value={formulario.nuevo_nombre_evaluador}
                      onChange={onEditarEvaluador}
                    />
                  </div>
                </div>
                <div className="editar">
                  <div className="editarLabel">
                    <InputLabel id="demo-simple--label">Correo: </InputLabel>
                  </div>
                  <div>
                    <TextField
                      id="outlined-basic"
                      type="text"
                      name="nuevo_correo"
                      value={formulario.nuevo_correo}
                      onChange={onEditarEvaluador}
                    />
                  </div>
                </div>
                <div className="editar">
                  <div className="editarLabel">
                    <InputLabel id="demo-simple--label">
                      Numero Identificación:{" "}
                    </InputLabel>
                  </div>
                  <div>
                    <TextField
                      id="outlined-basic"
                      type="text"
                      name="nuevo_numero_identificacion"
                      value={formulario.nuevo_numero_identificacion}
                      onChange={onEditarEvaluador}
                    />
                  </div>
                </div>
                <div className="editar">
                  <div className="editarLabel">
                    <InputLabel id="demo-simple--label">
                      Contraseña:{" "}
                    </InputLabel>
                  </div>
                  <div>
                    <TextField
                      id="outlined-basic"
                      type="text"
                      name="nueva_numero_identificacion"
                      value={formulario.nueva_contrasena}
                      onChange={onEditarEvaluador}
                    />
                  </div>
                </div>
                <div className="editar">
                  <div className="editarLabel">
                    <InputLabel id="demo-simple--label">Telefono: </InputLabel>
                  </div>
                  <div>
                    <TextField
                      id="outlined-basic"
                      type="text"
                      name="nuevo_telefono"
                      value={formulario.nuevo_telefono}
                      onChange={onEditarEvaluador}
                    />   
                  </div>
                </div>
              </div>
            </div>
            <div className="botonEditar">
              <Button
                type="submit"
                variant="contained"
              >
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};
