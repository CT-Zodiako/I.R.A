import { useState } from 'react';
import examenService from '../../services/ServiciosExamen';
import { EvaluacionInformacion } from './InformacionEvaluacion';
import { AgregarListaEstudiantes } from './EstudiantesEvaluacion';
import { RegistrarActividadFormativa } from './ActividadFormativa';

export const FormularioPorPasos = () => {
  const [formularioExamen, setFormulario] = useState({
    programa: '',
    proyecto_integrador: '',
    evaluadores: [],
    actividades_formativas: [],
    estudiantes: []
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
        console.error(error);
      });
  };

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

  const [paso, setPaso] = useState(1);

  const handleNext = () => {
    setPaso(paso + 1);
  };

  switch (paso) {
    case 1:
      return <Paso1 onNext={handleNext} />;
    case 2:
      return <Paso2 onNext={handleNext} />;
    case 3:
      return <Paso3 onNext={handleNext} />;
    case 4:
      return <Paso4 onNext={handleNext} />;
    default:
      return <div>Formulario completado</div>;
  }

  function Paso1({onNext}) {
    return (
      <EvaluacionInformacion 
        handleNext={onNext} 
        formularioExamen={formularioExamen} 
        programaFuncion={handleProgramaChange}
        aprendizajeResultado={handleResultadoAprendizajeChange}
        programaIntegrador={handleIntegradorChange}/>
    );
  }
  
  function Paso2({ onNext }) {
    return (
      <PanelSeleccionarEvaluador
        formularioExamen={formularioExamen} 
        seleccionEvaluador={handleNuevoEvaluadorChange}/>
    );
  }

  function Paso3({ onNext }) {
    return (
      <RegistrarActividadFormativa
        formularioExamen={formularioExamen} 
        actividadFormativa={handleNuevaActividadChange}/>
    );
  }

  function Paso4({ onNext }) {
    return (
      <AgregarListaEstudiantes
        listaEstudiantes={handleFileUpload}/>
    );
  }
}
