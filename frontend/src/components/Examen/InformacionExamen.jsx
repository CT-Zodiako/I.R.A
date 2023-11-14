import { useState, useEffect} from 'react'
import { InputSeleccion } from '../EtiquetaSeleccionGeneral'
import { useDispatch } from 'react-redux'
import { agregaInformacion } from '../../redux/examenSlice'
import programaServicio from '../../services/ServicioPrograma'
import resultadoAprendizajeServicio from '../../services/ServicioResultadoAprendizaje'

export const EvaluacionInformacion = ({handleNext}) => {

    const dispatch = useDispatch();
    const [informacionExamen, setInformacionExamen] = useState({
        programa_id: '',
        resultado_aprendizaje_id: '',
        proyecto_integrador: '',
    });
    const [programa, setPrograma] = useState([]);
    const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);
    const [camposCargados, setCamposCargados] = useState(false);

    const onPrograma = (seleccionId) => {
        setInformacionExamen({
            ...informacionExamen,
            programa_id: seleccionId
        })
    };

    const onResultado = (seleccionId) => {
        setInformacionExamen({
            ...informacionExamen,
            resultado_aprendizaje_id: seleccionId
        })
    };

    const onProyectoIntegrador = (event) => {
        const { name, value } = event.target;
        setInformacionExamen({
          ...informacionExamen,
          [name]: value
        });
    };

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
        const camposCargados =
          informacionExamen.programa_id &&
          informacionExamen.resultado_aprendizaje_id &&
          informacionExamen.proyecto_integrador;
    
          setCamposCargados(camposCargados);
      }, [informacionExamen]);

    const onEnviarInformacion = (event) => {
        event.preventDefault();
        dispatch(
            agregaInformacion({
                programa_id: informacionExamen.programa_id,
                resultado_aprendizaje_id: informacionExamen.resultado_aprendizaje_id,
                proyecto_integrador: informacionExamen.proyecto_integrador
            })
        );
        handleNext();
    }

    return(
        <>
            <form onSubmit={onEnviarInformacion}>
                <div>
                    <div>
                        <label>
                            Programa:
                            <InputSeleccion 
                                seleccionar={programa} 
                                idSeleccion={onPrograma}
                                label='seleccione programa'
                                variable='nombre'
                            />  
                        </label>
                        </div>
                        <div>
                        <label>
                            Resultado:
                            <InputSeleccion 
                                seleccionar={resultadoAprendizaje} 
                                idSeleccion={onResultado}
                                label='seleccione resultado'
                                variable='titulo'
                            />  
                        </label>
                        </div>
                        <div>
                        <label>
                        Proyecto Integrador:
                        <input 
                            type="text" 
                            name="proyecto_integrador" 
                            value={informacionExamen.proyecto_integrador} 
                            onChange={onProyectoIntegrador}
                        />
                        </label>
                    </div>
                </div>
                <div>
                    <button type='submit' disabled={!camposCargados}>Cargar</button>
                </div>
            </form>
        </>
    )
}