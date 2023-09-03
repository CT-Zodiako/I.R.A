import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    nombre_evaluador: '',
    correo: '',
    numero_identificacion: '',
    rol: '',
    contrasenna: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:3001/evaluador/agregar_evaluador', formData);
      console.log(response.data); // Maneja la respuesta del servidor aquí
    } catch (error) {
      console.error(error); // Maneja errores aquí
    }
  };

  return (
    <div>
      <h1>Crear Evaluador</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre_evaluador"
            value={formData.nombre_evaluador}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="text"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label># Numero identificacion:</label>
          <input
            type="text"
            name="numero_identificacion"
            value={formData.numero_identificacion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rol:</label>
          <input
            type="text"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contrseña:</label>
          <input
            type="text"
            name="contrasenna"
            value={formData.contrasenna}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefono:</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        {/* Agrega más campos de formulario aquí */}
        <div>
          <button type="submit">Crear Evaluador</button>
        </div>
      </form>
    </div>
  );
}

export default App;
