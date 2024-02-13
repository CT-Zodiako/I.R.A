import { useState } from "react";
import { Box, Button, InputLabel, Modal, TextField, Typography } from "@mui/material";
import evaluadorService from '../../services/servicioEvaluador'

export const ModalCrearEvaluador = ({ isOpen, onClose }) => {
  const [formulario, setFormulario] = useState({
    nombre_evaluador: "",
    correo: "",
    numero_identificacion: "",
    contrasenna: "",
    telefono: "",
  });

  const onAgregarEvaluador = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const onEnviarEvaluador = async (event) => {
    event.preventDefault();
    try {
      const response = await evaluadorService.agregarEvaluador(formulario);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <div className="modales">
            <form onSubmit={onEnviarEvaluador}>
              <div>
                <div className="centrar">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Actualizar Información Evaluador
                  </Typography>
                </div>
                <div>
                  <div className="editar">
                    <div className="editarLabel">
                      <InputLabel id="demo-simple--label">
                        Nombre evaluador:{" "}
                      </InputLabel>
                    </div>
                    <div>
                      <TextField
                        id="outlined-basic"
                        type="text"
                        name="nuevo_nombre_evaluador"
                        value={formulario.nombre_evaluador}
                        onChange={onAgregarEvaluador}
                        required
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
                        value={formulario.correo}
                        onChange={onAgregarEvaluador}
                        required
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
                        value={formulario.numero_identificacion}
                        onChange={onAgregarEvaluador}
                        required
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
                        value={formulario.contrasena}
                        onChange={onAgregarEvaluador}
                        required
                      />
                    </div>
                  </div>
                  <div className="editar">
                    <div className="editarLabel">
                      <InputLabel id="demo-simple--label">
                        Telefono:{" "}
                      </InputLabel>
                    </div>
                    <div>
                      <TextField
                        id="outlined-basic"
                        type="text"
                        name="nuevo_telefono"
                        value={formulario.telefono}
                        onChange={onAgregarEvaluador}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="botonEditar">
                <Button type="submit" variant="contained">
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
