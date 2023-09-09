import { useEffect, useState } from 'react';
import examenService from '../services/ServiciosExamen';
import resultadoAprendizajeServicio from '../services/ServicioResultadoAprendizaje';
import evaluadorService from '../services/servicioEvaluador';
import { InputSeleccion } from '../components/EtiquetaSeleccionGeneral';
import { InputSeleccionEvaluador } from '../components/Seleccionevaluador';

export const CrearExamen = () => {
  const [formularioExamen, setFormulario] = useState({
    programa: '',
    resultadoAprendizaje: '',
    proyecto_integrador: '',
    evaluadores: [],
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
      resultadoAprendizaje: selectedId, 
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
      evaluadores: selectedId, 
    });
  };

  // const handleNuevoEvaluadorChange = (event) => {
  //   const { name, value } = event.target;
  //   setNuevoEvaluador({
  //     ...nuevoEvaluador,
  //     [name]: value
  //   });
  // };

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
        evaluadores: [...formularioExamen.evaluadores, nuevoEvaluador]
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
        console.log(data);
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
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
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
          {formularioExamen.evaluadores.map((evaluador, index) => (
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
            {/* <input
              type="text"
              name="nombre"
              value={nuevoEvaluador.nombre}
              onChange={handleNuevoEvaluadorChange}
              placeholder="Nombre del evaluador"
            /> */}
            <div>
                <InputSeleccionEvaluador 
                  seleccionar={evaluadores} 
                  idSeleccion={handleNuevoEvaluadorChange}/>  
            </div>
            <button type="button" onClick={agregarEvaluador}>
              Agregar Evaluador
            </button>
          </div>
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
</div>

        {/* Resto del formulario */}
        <button type="submit">Crear Examen</button>
      </form>
    </div>
  );
};
