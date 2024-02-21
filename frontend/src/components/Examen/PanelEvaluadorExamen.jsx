import { useEffect, useState } from "react"
import { InputSeleccion } from "../EtiquetaSeleccionGeneral"
import evaluadorService from "../../services/servicioEvaluador"
import examenService from "../../services/ServiciosExamen"
import { useDispatch, useSelector } from "react-redux"
import { agregarEvaluador } from "../../redux/examenSlice"
import { BotonGeneral } from "../botonGeneral"
import { BotonRegresar } from "./botonRegresar"
import './examen.css'
import { 
  Button,
  Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow 
} from "@mui/material"

export const PanelSeleccionarEvaluador = ({ suiguiente, anterior, examenId, accion }) => {
  const dispatch = useDispatch();
  const infoEvaluadorStore = useSelector((state) => state.examenFormulario);

  const [evaluadores, setEvaluadores] = useState({evaluadores_ids: infoEvaluadorStore.evaluadores_ids});
  const [listaEvaluadores, setListaEvaluadores] = useState([]);

  const regresarPanelExamen = () => {
    anterior();
  };

  const onEvaluadores = (selectedId) => {
    if(selectedId){
      setEvaluadores({
        ...evaluadores,
        evaluadores_ids: [...evaluadores.evaluadores_ids, selectedId],
      });
    };
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
        const data = await evaluadorService.traerEvaluadorByEstado();
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
    suiguiente();
  };

  return (
    <>
      <div>
        <div className="botonRegresar">
          <BotonRegresar
            regresar={ regresarPanelExamen }
          />
        </div>
        <div className="informacion">
          <form onSubmit={onEnviarEvaluadores}>
            <div className="componentes">
              <h2>Panel Evaluadores</h2>
              <div className="centrar">
                <InputSeleccion
                  seleccionar={listaEvaluadores}
                  idSeleccion={onEvaluadores}
                  label="seleccione evaluador"
                  variable="nombre_evaluador"
                  anchoSelec='20rem'
                />
              </div>
              <div>
                <TableContainer sx={{ width: "40rem" }} className="tablas">
                  <Table aria-label="caption table">
                    <TableHead className="tablaEncabezado">
                      <TableRow>
                        <TableCell align="center">Nombre del Evaluador</TableCell>
                        <TableCell align="center">Correo del Evaluador</TableCell>
                        <TableCell align="center">Acción</TableCell>
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
                            <TableCell scope="row" align="left" sx={{width: "50%"}}>
                              <div style={{width: "100%"}}>
                                {evaluador.nombre_evaluador}
                              </div>
                            </TableCell>
                            <TableCell align="left" sx={{ width: "40%" }}>
                              {evaluador.correo}
                            </TableCell>
                            <TableCell align="center" sx={{ width: "10%" }}>
                              <Button 
                                variant="contained" 
                                sx={{ backgroundColor: "red"}}
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
      </div>
    </>
  );
};
