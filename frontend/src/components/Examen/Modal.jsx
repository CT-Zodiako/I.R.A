import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import evaluadorService from '../../services/servicioEvaluador';

export const ModalIRA = ({ isOpen, onClose, evaluadorId }) => {
  const [formulario, setFormulario] = useState({
    nombre_evaluador: '',
    correo: '',
    numero_identificacion: '',
    telefono: '',
  });

  useEffect(() => {
    const obtenerEvaluador = async () => {
      try {
        const response = await evaluadorService.obtenerEvaluador(evaluadorId);
        setFormulario(response);
        console.log("evaluador: ", response);
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
      [name]: value
    });
  };

  const onEnviarEdicionEvaluador = async (event) => {
    event.preventDefault();
    try {
      const response = await evaluadorService.editarEvaluador(evaluadorId, formulario);
      console.log(response);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h1>Editar Evaluador</h1>
      <form onSubmit={onEnviarEdicionEvaluador}>
      <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre_evaluador"
            value={formulario.nombre_evaluador}
            onChange={onEditarEvaluador}
            required
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="text"
            name="correo"
            value={formulario.correo}
            onChange={onEditarEvaluador}
            required
          />
        </div>
        <div>
          <label>Numero identificacion:</label>
          <input
            type="text"
            name="numero_identificacion"
            value={formulario.numero_identificacion}
            onChange={onEditarEvaluador}
            required
          />
        </div>
        <div>
          <label>Telefono:</label>
          <input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={onEditarEvaluador}
            required
          />
        </div>
        <div>
          <button type="submit">Crear Evaluador</button>
        </div>
      </form>
    </Modal>
  );
};
