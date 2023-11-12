import { useEffect, useState } from "react";
import { InputSeleccion } from "../EtiquetaSeleccionGeneral";
import evaluadorService from '../../services/servicioEvaluador';
import { useDispatch, useSelector } from "react-redux";
import { agregarEvaluador, eliminarEvaluador } from '../../redux/examenSlice'

export const PanelSeleccionarEvaluador = ({handleNext}) => {
  
  const examen = useSelector((state) => state.examenFormulario);
  const dispatch = useDispatch();
  
  const [evaluadores, setEvaluadores ] = useState({
    evaluadores_ids: []
  });
  const [listaEvaluadores, setListaEvaluadores] = useState([]);

  const onEvaluadores = (selectedId) => {
    setEvaluadores({
      ...evaluadores,
      evaluadores_ids:[...evaluadores.evaluadores_ids, selectedId], 
    });
  };

  const eliminarEvaluadorLista = (index) =>{
    const nuevoFormulario = { ...evaluadores };
    const nuevasActividades = [...nuevoFormulario.evaluadores_ids]
    nuevasActividades.splice(index, 1);
    nuevoFormulario.evaluadores_ids = nuevasActividades;
    setEvaluadores(nuevoFormulario);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await evaluadorService.traerEvaluador();
        setListaEvaluadores(data);
      } catch (error) {
        console.error('Error al obtener el evaluador:', error);
      }
    }
    fetchData();
  }, []);

  const onEnviarEvaluadores = (event) => {
    event.preventDefault();
    dispatch(
      agregarEvaluador({
        evaluadores_ids: evaluadores.evaluadores_ids
      })
    )
    handleNext();
  }

    return(
        <>
          <form onSubmit={onEnviarEvaluadores}>
            <div>
              <h2>Evaluadores</h2>
              <div>
                  <InputSeleccion 
                    seleccionar={listaEvaluadores} 
                    idSeleccion={onEvaluadores}
                    label='seleccione evaluador'
                    variable='nombre_evaluador'/>  
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
                    {evaluadores.evaluadores_ids.map((evaluadorId, index) => {
                      const evaluador = listaEvaluadores.find(e => e.id === evaluadorId);
                      if (!evaluador) {
                        return null; 
                      }
                      return (
                        <tr key={index}>
                          <td>{evaluador.nombre_evaluador}</td>
                          <td>{evaluador.correo}</td>
                          <td>
                            <button type='button' onClick={() => eliminarEvaluadorLista(index)}>Eliminar</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <button type="submit">Cargar</button>
            </div>
          </form>
        </>
    )
}