import { useEffect, useState } from "react"
import { InputSeleccion } from "../EtiquetaSeleccionGeneral"
import evaluadorService from "../../services/servicioEvaluador"
import { useDispatch, useSelector } from "react-redux"
import { agregarEvaluador } from "../../redux/examenSlice"
import { BotonGeneral } from "../botonGeneral"
import { 
  Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow 
} from "@mui/material"

export const PanelSeleccionarEvaluador = ({ handleNext }) => {
  const examen = useSelector((state) => state.examenFormulario);
  const dispatch = useDispatch();

  const [evaluadores, setEvaluadores] = useState({
    evaluadores_ids: [],
  });
  const [listaEvaluadores, setListaEvaluadores] = useState([]);

  const onEvaluadores = (selectedId) => {
    setEvaluadores({
      ...evaluadores,
      evaluadores_ids: [...evaluadores.evaluadores_ids, selectedId],
    });
  };

  const eliminarEvaluadorLista = (index) => {
    const nuevoFormulario = { ...evaluadores };
    const nuevasActividades = [...nuevoFormulario.evaluadores_ids];
    nuevasActividades.splice(index, 1);
    nuevoFormulario.evaluadores_ids = nuevasActividades;
    setEvaluadores(nuevoFormulario);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await evaluadorService.traerEvaluador();
        setListaEvaluadores(data);
      } catch (error) {
        console.error("Error al obtener el evaluador:", error);
      }
    }
    fetchData();
  }, []);

  const onEnviarEvaluadores = (event) => {
    event.preventDefault();
    dispatch(
      agregarEvaluador({
        evaluadores_ids: evaluadores.evaluadores_ids,
      })
    );
    handleNext();
  };

  return (
    <>
      <div className="informacion">
        <form onSubmit={onEnviarEvaluadores}>
          <div>
            <h2>Evaluadores</h2>
            <div>
              <InputSeleccion
                seleccionar={listaEvaluadores}
                idSeleccion={onEvaluadores}
                label="seleccione evaluador"
                variable="nombre_evaluador"
              />
            </div>
            <div>
              <TableContainer>
                <Table sx={{ minWidth: 650, width: '700px'}} aria-label="caption table">
                  <TableHead sx={{ background: "rgba(0, 0, 255, 0.5)" }}>
                    <TableRow>
                      <TableCell>Nombre del Evaluador</TableCell>
                      <TableCell>Correo del Evaluador</TableCell>
                      <TableCell>Acción</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {evaluadores.evaluadores_ids.map((evaluadorId, index) => {
                      const evaluador = listaEvaluadores.find(
                        (e) => e.id === evaluadorId
                      );
                      if (!evaluador) {
                        return null;
                      }
                      return (
                        <TableRow key={index}>
                          <TableCell scope="row" align="left">
                            {evaluador.nombre_evaluador}
                          </TableCell>
                          <TableCell align="left">{evaluador.correo}</TableCell>
                          <TableCell align="left">
                            <button
                              type="button"
                              onClick={() => eliminarEvaluadorLista(index)}
                            >
                              Eliminar
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div>
            <button type="submit">Cargar</button>
          </div>
        </form>
      </div>
    </>
  );
};
