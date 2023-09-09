import { useEffect, useState } from 'react';
import { InputSeleccion } from '../EtiquetaSeleccionGeneral';
import resultadoAprendizajeServicio from '../../services/ServicioResultadoAprendizaje';
import examenService from '../../services/ServiciosExamen';

export const FormularioPorPasos = () => {
  const [formularioExamen, setFormulario] = useState({
    programa: '',
    proyecto_integrador: '',
    evaluadores: [],
    actividades_formativas: [],
    estudiantes: []
  });

  const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);

  const handleProgramaChange = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formularioExamen,
      [name]: value
    });
  };

  const handleIntegradorChange = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formularioExamen,
      [name]: value
    });
  };
  
  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   console.log(formularioExamen);
  //   try {
  //     const response = await  examenService.agregarExamen(formularioExamen);
  //     console.log('Respuesta del servidor:', response.data);
  //   } catch (error) {
  //     console.error('Error al enviar los datos:', error);
  //   }
  // };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await resultadoAprendizajeServicio.traerResultado();
        setResultadoAprendizaje(data);
        console.log(data);
      } catch (error) {
        console.error('Error al obtener el resultado:', error);
      }
    }
    fetchData();
  }, []);

  
  const [paso, setPaso] = useState(1);

  const handleNext = () => {
    setPaso(paso + 1);
  };

  switch (paso) {
    case 1:
      return <Paso1 onNext={handleNext} />;
    case 2:
      return <Paso2 onNext={handleNext} />;
    default:
      return <div>Formulario completado</div>;
  }

  function Paso1({onNext}) {
    return (
      // <EvaluacionInformacion 
      //   handleNext={onNext} 
      //   formularioExamen={formularioExamen} 
      //   setFormulario={setFormulario}/>
      <div>
        <h1>Información de la evaluación</h1>
        <form action="">
          <div>
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
                <InputSeleccion seleccion={resultadoAprendizaje} propiedad="titulo"/>  
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
          </div>
          <button onClick={ onNext }>Siguiente</button>
        </form>
      </div>
    );
  }
  
  // function Paso2({ onNext }) {
  //   return (
  //     <PanelSeleccionarEvaluador/>
  //     // <div>
  //     //   <h2>Paso 2</h2>
  //     //   <label>Nombre:</label>
  //     //     <input
  //     //       type="text"
  //     //       name="nombre_evaluador"
  //     //       // value={formulario.nombre_evaluador}
  //     //       // onChange={handleChange}
  //     //       required
  //     //     />  
  //     //     <label>Nombre:</label>
  //     //     <input
  //     //       type="text"
  //     //       name="nombre_evaluador"
  //     //       // value={formulario.nombre_evaluador}
  //     //       // onChange={handleChange}
  //     //       required
  //     //     />     
  //     //   <button onClick={onNext}>Siguiente</button>
  //     // </div>
  //   );
  // }
}
