import { useState } from "react";
import { Box, Button, InputLabel, Modal, TextField, Typography } from "@mui/material";
import evaluadorService from '../../services/servicioEvaluador'
import { cambiarEstadoBoton } from "../../redux/botonAlertaSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ModalCrearEvaluador = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      await evaluadorService.agregarEvaluador(formulario);
      dispatch(
        cambiarEstadoBoton({
          botonAlerta: true,
        }),
      );
      navigate('/evaluadores');
      onClose();
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
                      <InputLabel>
                        Nombre evaluador:
                      </InputLabel>
                    </div>
                    <div>
                      <TextField
                        id="outlined-basic"
                        type="text"
                        name="nombre_evaluador"
                        value={formulario.nombre_evaluador}
                        onChange={onAgregarEvaluador}
                        required
                      />
                    </div>
                  </div>
                  <div className="editar">
                    <div className="editarLabel">
                      <InputLabel>Correo: </InputLabel>
                    </div>
                    <div>
                      <TextField
                        type="email"
                        name="correo"
                        value={formulario.correo}
                        onChange={onAgregarEvaluador}
                        required
                      />
                    </div>
                  </div>
                  <div className="editar">
                    <div className="editarLabel">
                      <InputLabel>
                        Numero Identificación:
                      </InputLabel>
                    </div>
                    <div>
                      <TextField
                        type="number"
                        name="numero_identificacion"
                        value={formulario.numero_identificacion}
                        onChange={onAgregarEvaluador}
                        required
                      />
                    </div>
                  </div>
                  <div className="editar">
                    <div className="editarLabel">
                      <InputLabel>
                        Contraseña:{" "}
                      </InputLabel>
                    </div>
                    <div>
                      <TextField
                        type="password"
                        name="contrasenna"
                        value={formulario.contrasenna}
                        onChange={onAgregarEvaluador}
                        required
                      />
                    </div>
                  </div>
                  <div className="editar">
                    <div className="editarLabel">
                      <InputLabel>
                        Telefono:
                      </InputLabel>
                    </div>
                    <div>
                      <TextField
                        type="number"
                        name="telefono"
                        value={formulario.telefono}
                        onChange={onAgregarEvaluador}
                        required
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
    </>
  );
};
