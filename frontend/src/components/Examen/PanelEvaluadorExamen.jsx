import { useEffect, useState } from "react"
import { InputSeleccion } from "../EtiquetaSeleccionGeneral"
import evaluadorService from "../../services/servicioEvaluador"
import examenService from "../../services/ServiciosExamen"
import { useDispatch, useSelector } from "react-redux"
import { agregarEvaluador } from "../../redux/examenSlice"
import { BotonGeneral } from "../botonGeneral"
import './examen.css'
import { 
  Button,
  Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow 
} from "@mui/material"

export const PanelSeleccionarEvaluador = ({ handleNext, examenId, accion }) => {
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

  if(accion === 'editar'){
    useEffect(()=>{
      async function fetchData() {
        try{
          const responce = await examenService.examenPorId(examenId);
          setEvaluadores({
            ...evaluadores,
            evaluadores_ids: responce.evaluadores_relacion
          })
        } catch (error) {
          console.error("No se puedo obtener la informacion del examen: ", error);
        }
      }
      fetchData()
    }, [])
  }

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
          <div className="componentes">
            <h2>Evaluadores</h2>
            <div className="centrar">
              <InputSeleccion
                seleccionar={listaEvaluadores}
                idSeleccion={onEvaluadores}
                label="seleccione evaluador"
                variable="nombre_evaluador"
              />
            </div>
            <div>
              <TableContainer sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 350, maxWidth: 700}} aria-label="caption table">
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
                            <Button 
                              variant="outlined" 
                              size="small"
                              type="button"
                              onClick={() => eliminarEvaluadorLista(index)}
                            >
                              Eliminar
                            </Button>
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
            <BotonGeneral
              tipo='submit'
              camposCargados={evaluadores.evaluadores_ids.length}
              accion='Cargar'
            />
          </div>
        </form>
      </div>
    </>
  );
};
