import { useState, useEffect} from 'react';
import { InputSeleccion } from '../EtiquetaSeleccionGeneral'
import resultadoAprendizajeServicio from '../../services/ServicioResultadoAprendizaje';
import { useDispatch } from 'react-redux';

export const EvaluacionInformacion = ({handleNext}) => {

    const dispatch = useDispatch();
    const [informacionExamen, setInformacionExamen] = useState({
        programa_id: '',
        resultado_aprendizaje_id: '',
        proyecto_integrador: '',
    });
    const [programa, setPrograma] = useState([]);
    const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);

    
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
        setFormulario({
          ...informacionExamen,
          [name]: value
        });
    };

    const onEnviarInformacion = () => {
        dispatch(
            agregaInformacion({
                programa_id: informacionExamen.programa_id,
                resultado_aprendizaje_id: informacionExamen.resultado_aprendizaje_id,
                proyecto_integrador: informacionExamen.proyecto_integrador
            })
        )
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
            </form>
        </>
    )
}