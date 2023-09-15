import { useEffect, useState } from 'react';
import axios from 'axios';
import examenService from '../services/ServiciosExamen';
import resultadoAprendizajeServicio from '../services/ServicioResultadoAprendizaje';
import evaluadorService from '../services/servicioEvaluador';
import { InputSeleccion } from '../components/EtiquetaSeleccionGeneral';
import { InputSeleccionEvaluador } from '../components/Seleccionevaluador';

export const CrearExamen = () => {
  const [formularioExamen, setFormulario] = useState({
    programa: '',
    resultado_aprendizaje_id: '',
    proyecto_integrador: '',
    evaluadores_ids: [],
    actividades_formativas: [],
    estudiantes: []
  });

  const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);
  const [evaluadores, setEvaluadores] = useState([]);

  const [nuevoEvaluador, setNuevoEvaluador] = useState({
    id:'',
  });

  const [nuevaActividad, setNuevaActividad] = useState({
    descripcion: ''
  });

  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombreEstudiante: ''
  });

  const handleProgramaChange = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formularioExamen,
      [name]: value
    });
  };

  const handleResultadoAprendizajeChange = (selectedId) => {
    setFormulario({
      ...formularioExamen,
      resultado_aprendizaje_id: selectedId, 
    });
  };

  const handleIntegradorChange = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formularioExamen,
      [name]: value
    });
  };

  const handleNuevoEvaluadorChange = (selectedId) => {
    setFormulario({
      ...formularioExamen,
      evaluadores_ids:[...formularioExamen.evaluadores_ids, selectedId], 
    });
    console.log(selectedId)
  };

  const handleNuevaActividadChange = (event) => {
    const { name, value } = event.target;
    setNuevaActividad({
      ...nuevaActividad,
      [name]: value
    });
  };

  const handleNuevoEstudianteChange = (event) => {
    const { name, value } = event.target;
    setNuevoEstudiante({
      ...nuevoEstudiante,
      [name]: value
    });
  };

  const agregarEvaluador = () => {
    if (nuevoEvaluador.nombre && nuevoEvaluador.correo) {
      setFormulario({
        ...formularioExamen,
        evaluadores_ids: [...formularioExamen.evaluadores_ids, nuevoEvaluador]
      });
      setNuevoEvaluador({
        nombre: '',
        correo: ''
      });
    }
  };

  const agregarActividad = () => {
    if (nuevaActividad.descripcion) {
      setFormulario({
        ...formularioExamen,
        actividades_formativas: [...formularioExamen.actividades_formativas, nuevaActividad]
      });
      setNuevaActividad({
        descripcion: ''
      });
    }
  };

  const agregarEstudiante = () => {
    if (nuevoEstudiante.nombreEstudiante) {
      setFormulario({
        ...formularioExamen,
        estudiantes: [...formularioExamen.estudiantes, nuevoEstudiante]
      });
      setNuevoEstudiante({
        nombreEstudiante: ''
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await resultadoAprendizajeServicio.traerResultado();
        setResultadoAprendizaje(data);
      } catch (error) {
        console.error('Error al obtener el resultado:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await evaluadorService.traerEvaluador();
        setEvaluadores(data);
      } catch (error) {
        console.error('Error al obtener el resultado:', error);
      }
    }
    fetchData();
  }, []);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formularioExamen);
    try {
      const response = await  examenService.agregarExamen(formularioExamen);
      console.log(`Respuesta del servidor: ${response.data.mensaje}`);
      console.log(formularioExamen.event)
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('archivo', file);
  
    axios.post('http://127.0.0.1:3001/examen/ruta_de_carga_de_archivos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setFormulario({
          ...formularioExamen,
          estudiantes: [ response.data.datos]
        });      
      })
      .catch((error) => {
        // Maneja cualquier error
        console.error(error);
      });
  };

  return (    
    <div>
      <h1>Crear Examen</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Programa:
            <input 
              type="text" 
              name="programa" 
              value={formularioExamen.programa} 
              onChange={handleProgramaChange}
            />
          </label>
        </div>
        <div>
          <label>
            Resultado:
            <InputSeleccion 
              seleccion={resultadoAprendizaje} 
              seleccionIdRA={handleResultadoAprendizajeChange}/>  
          </label>
        </div>
        <div>
        <label>
          Programa Integrador:
          <input 
            type="text" 
            name="proyecto_integrador" 
            value={formularioExamen.proyecto_integrador} 
            onChange={handleIntegradorChange}
          />
        </label>
        </div>

        {/* EVALUADORES */}
        <div>
          <h3>Evaluadores</h3>
          {formularioExamen.evaluadores_ids.map((evaluador, index) => (
            <div key={index}>
              <input
                type="text"
                name={`evaluadores[${index}].nombre`}
                value={evaluador.nombre}
                onChange={(e) => handleNuevoEvaluadorChange(e, index)}
                placeholder="Nombre del evaluador"
              />
              <input
                type="text"
                name={`evaluadores[${index}].correo`}
                value={evaluador.correo}
                onChange={(e) => handleNuevoEvaluadorChange(e, index)}
                placeholder="Correo del evaluador"
              />
              <button type="button" onClick={() => eliminarEvaluador(index)}>
                Eliminar
              </button>
            </div>
          ))}
          <div>
            <div>
                <InputSeleccionEvaluador 
                  seleccionar={evaluadores} 
                  idSeleccion={handleNuevoEvaluadorChange}/>  
            </div>
            <button type="button" onClick={agregarEvaluador}>
              Agregar Evaluador
            </button>
          </div>
          <table>
            <thead>
            <tr>
              <th>Nombre del Evaluador</th>
              <th>Correo del Evaluador</th>
            </tr>
            </thead>
            <tbody>
            {formularioExamen.evaluadores_ids.map((evaluador, index) => (
              <tr key={index}>
                <td>{evaluador.nombre_evaluador}</td>
                <td>{evaluador.correo}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

{/* ACTIVIDAD FORMATIVA */}
<div>
  <h3>Actividad Formativa</h3>
  {formularioExamen.actividades_formativas.map((actividad, index) => (
    <div key={index}>
      <input
        type="text"
        name={`actividades_formativas[${index}].descripcion`}
        value={actividad.descripcion}
        onChange={(e) => handleNuevaActividadChange(e, index)}
        placeholder="Descripción actividad"
      />
      <button type="button" onClick={() => eliminarActividad(index)}>
        Eliminar
      </button>
    </div>
  ))}
  <div>
    <input
      type="text"
      name="descripcion"
      value={nuevaActividad.descripcion}
      onChange={handleNuevaActividadChange}
      placeholder="Descripción actividad"
    />
    <button type="button" onClick={agregarActividad}>
      Agregar Actividad
    </button>
  </div>
</div>

{/* ESTUDIANTE */}
<div>
  <h3>Estudiante</h3>
  {formularioExamen.estudiantes.map((estudiante, index) => (
    <div key={index}>
      <input
        type="text"
        name={`estudiantes[${index}].nombreEstudiante`}
        value={estudiante.nombreEstudiante}
        onChange={(e) => handleNuevoEstudianteChange(e, index)}
        placeholder="Nombre del estudiante"
      />
      <button type="button" onClick={() => eliminarEstudiante(index)}>
        Eliminar
      </button>
    </div>
  ))}
  <div>
    <div>
      <input
        type="text"
        name="nombreEstudiante"
        value={nuevoEstudiante.nombreEstudiante}
        onChange={handleNuevoEstudianteChange}
        placeholder="Nombre del estudiante"
      />
      <button type="button" onClick={agregarEstudiante}>
        Agregar Estudiante
      </button>
    </div>
    <div>
      <input
        type="file"
        accept="xlsx" 
        onChange={handleFileUpload}
      />
    </div>
  </div>
</div>

        {/* Resto del formulario */}
        <button type="submit">Crear Examen</button>
      </form>
    </div>
  );
};
