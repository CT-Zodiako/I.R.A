import { useEffect, useState } from 'react';
import axios from 'axios';
import examenService from '../services/ServiciosExamen';
import resultadoAprendizajeServicio from '../services/ServicioResultadoAprendizaje';
import evaluadorService from '../services/servicioEvaluador';
import programaServicio from '../services/ServicioPrograma'; 
import { InputSeleccion } from '../components/EtiquetaSeleccionGeneral';

export const CrearExamen = () => {
  const [formularioExamen, setFormulario] = useState({
    programa_id: '',
    resultado_aprendizaje_id: '',
    proyecto_integrador: '',
    evaluadores_ids: [],
    actividades_formativas: [],
    estudiantes: []
  });

  const [programa, setPrograma] = useState([]);
  const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);
  const [evaluadores, setEvaluadores] = useState([]);

  const [nuevoEvaluador, setNuevoEvaluador] = useState({
    id:'',
  });

  const [nuevaActividad, setNuevaActividad] = useState({
    descripcion: ''
  });

  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    NOMBRE: ''
  });

  const onPrograma = (selectedId) => {
    setFormulario({
      ...formularioExamen,
      programa_id: selectedId, 
    });
  };

  const onResultado = (selectedId) => {
    setFormulario({
      ...formularioExamen,
      resultado_aprendizaje_id: selectedId, 
    });
  };

  const onProyectoIntegrador = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formularioExamen,
      [name]: value
    });
  };

  const onEvaluadores = (selectedId) => {
    setFormulario({
      ...formularioExamen,
      evaluadores_ids:[...formularioExamen.evaluadores_ids, selectedId], 
    });
  };

  const onActividadFormativa = (event) => {
    const { name, value } = event.target;
    setNuevaActividad({
      ...nuevaActividad,
      [name]: value
    });
  };

  const onEstudiante = (event) => {
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
    if (nuevoEstudiante.NOMBRE) {
      setFormulario({
        ...formularioExamen,
        estudiantes: [...formularioExamen.estudiantes, nuevoEstudiante]
      });
      setNuevoEstudiante({
        NOMBRE: ''
      });
    }
  };

  const eliminarEvaluador = (index) =>{
    const nuevoFormulario = { ...formularioExamen };
    const nuevasActividades = [...nuevoFormulario.evaluadores_ids]
    nuevasActividades.splice(index, 1);
    nuevoFormulario.evaluadores_ids = nuevasActividades;
    setFormulario(nuevoFormulario);
  }

  const eliminarActividad = (index) =>{
    const nuevoFormulario = { ...formularioExamen };
    const nuevasActividades = [...nuevoFormulario.actividades_formativas]
    nuevasActividades.splice(index, 1);
    nuevoFormulario.actividades_formativas = nuevasActividades;
    setFormulario(nuevoFormulario);
  }

  const eliminarEstudiante = (index) =>{
    const nuevoFormulario = { ...formularioExamen };
    const nuevasActividades = [...nuevoFormulario.estudiantes]
    nuevasActividades.splice(index, 1);
    nuevoFormulario.estudiantes = nuevasActividades;
    setFormulario(nuevoFormulario);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await programaServicio.traerPrograma();
        setPrograma(data);
      } catch (error) {
        console.error('Error al obtener el programa:', error);
      }
    }
    fetchData();
  }, []);


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
        console.error('Error al obtener el evaluador:', error);
      }
    }
    fetchData();
  }, []);
  
  const onCargarExamen = async(e) => {
    e.preventDefault();
    console.log(formularioExamen);
    try {
      const response = await  examenService.agregarExamen(formularioExamen);
    } catch (error) {
      console.error('Error al enviar los datos del examen:', error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
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
          estudiantes: response.data
        }); 
        console.log(response.data)     
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (    
    <div>
      <h1>Crear Examen</h1>
      <form onSubmit={onCargarExamen}>
        <div>
          <label>
            Programa:
            <InputSeleccion 
              seleccionar={programa} 
              idSeleccion={onPrograma}
              label='seleccione programa'
              variable='nombre'/>  
          </label>
        </div>
        <div>
          <label>
            Resultado:
            <InputSeleccion 
              seleccionar={resultadoAprendizaje} 
              idSeleccion={onResultado}
              label='seleccione resultado'
              variable='titulo'/>  
          </label>
        </div>
        <div>
        <label>
          Proyecto Integrador:
          <input 
            type="text" 
            name="proyecto_integrador" 
            value={formularioExamen.proyecto_integrador} 
            onChange={onProyectoIntegrador}
          />
        </label>
        </div>

        <div>
          <h3>Evaluadores</h3>
          <div>
            <div>
                <InputSeleccion 
                  seleccionar={evaluadores} 
                  idSeleccion={onEvaluadores}
                  label='seleccione evaluador'
                  variable='nombre_evaluador'/>  
            </div>
            <button type="button" onClick={agregarEvaluador}>
              Agregar Evaluador
            </button>
          </div>
          <div>
            <table>
              <thead>
              <tr>
                <th>Nombre del Evaluador</th>
                <th>Correo del Evaluador</th>
              </tr>
              </thead>
              <tbody>
                {formularioExamen.evaluadores_ids.map((evaluadorId, index) => {
                  const evaluador = evaluadores.find(e => e.id === evaluadorId);
                  if (!evaluador) {
                    return null; 
                  }
                  return (
                    <tr key={index}>
                      <td>{evaluador.nombre_evaluador}</td>
                      <td>{evaluador.correo}</td>
                      <td>
                        <button onClick={() => eliminarEvaluador(index)}>Eliminar</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3>Actividad Formativa</h3>
          <div>
            <input
              type="text"
              name="descripcion"
              value={nuevaActividad.descripcion}
              onChange={onActividadFormativa}
              placeholder="Descripción actividad"
            />
            <button type="button" onClick={agregarActividad}>
              Agregar Actividad
            </button>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>descripcion</th>
                </tr>
              </thead>
              <tbody>
              {formularioExamen.actividades_formativas.map((actividad, index) => (
                  <tr key={index}>
                    <td>{actividad.descripcion}</td>
                    <td>
                      <button onClick={() => eliminarActividad(index)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3>Estudiante</h3>
          <div>
            <div>
              <input
                type="text"
                name="NOMBRE"
                value={nuevoEstudiante.NOMBRE}
                onChange={onEstudiante}
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
          <div>
              <table>
                <thead>
                  <tr>
                    <th>Nombre del Estudiante</th>
                  </tr>
                </thead>
                <tbody>
                  {formularioExamen.estudiantes.map((estudiante, index) => (
                    <tr key={index}>
                      <td>{estudiante.NOMBRE}</td>
                      <td>
                        <button onClick={() => eliminarEstudiante(index)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
        <button type="submit">Crear Examen</button>
      </form>
    </div>
  );
};
