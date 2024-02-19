import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { agregarActividad } from "../../redux/examenSlice"
import examenService from "../../services/ServiciosExamen"
import {
  Button, Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableRow,
  TextField,
} from "@mui/material";
import { BotonGeneral } from "../botonGeneral";
import { BotonRegresar } from "./botonRegresar";

export const RegistrarActividadFormativa = ({ suiguiente, anterior, examenId, accion }) => {
  const dispatch = useDispatch();
  const infoActividadStore = useSelector((state) => state.examenFormulario);

  const [actividaEstado, setActividaEstado] = useState();
  const [actividadFormativa, setActividadFormativa] = useState({
    actividades_formativas: infoActividadStore.actividades_formativas,
  });

  const regresarPanelExamen = () => {
    anterior();
  };

  const onActividadFormativa = (event) => {
    setActividaEstado(event.target.value);
  };

  if(accion === 'editar'){
    useEffect(()=>{
      async function fetchData() {
        try{
          const responce = await examenService.examenPorId(examenId);
          setActividadFormativa({
            ...actividadFormativa,
            actividades_formativas: responce.actividades_formativas
          })
        } catch (error) {
          console.error("No se puedo obtener la informacion del examen: ", error);
        }
      }
      fetchData()
    }, [])
  }

  const onAgregarActividad = () => {
    if (actividaEstado) {
      setActividadFormativa({
        ...actividadFormativa,
        actividades_formativas: [
          ...actividadFormativa.actividades_formativas,
          actividaEstado,
        ],
      });
    };
    setActividaEstado("");
  };

  const eliminarActividadLista = (index) => {
    const nuevoFormulario = { ...actividadFormativa };
    const nuevasActividades = [...nuevoFormulario.actividades_formativas];
    nuevasActividades.splice(index, 1);
    nuevoFormulario.actividades_formativas = nuevasActividades;
    setActividadFormativa(nuevoFormulario);
  };

  const onEnviarActividad = (event) => {
    event.preventDefault();
    dispatch(
      agregarActividad({
        actividades_formativas: actividadFormativa.actividades_formativas,
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
          <form onSubmit={onEnviarActividad}>
            <div className="componentes">
              <h2>Panel Actividad Formativa</h2>
              <div className="centrar">
                <div className="centrar">
                  <TextField
                    sx={{ width: "21rem", margin: "10px" }}
                    id="outlined-multiline-static"
                    type="text"
                    label="Descripción actividad"
                    name="descripcion"
                    onChange={onActividadFormativa}
                    value={actividaEstado}
                    multiline
                    rows={2}
                  />
                </div>
                <div className="centrar">
                  <Button
                    type="button"
                    onClick={onAgregarActividad}
                    className="textButton"
                    variant="contained"
                    size="small"
                  >
                    <div>
                      Agregar
                    </div>
                  </Button>
                </div>
              </div>
              <div>
                <TableContainer sx={{ width: "35rem" }} className="tablas">
                  <Table>
                    <TableHead className="tablaEncabezado">
                      <TableRow>
                        <TableCell align="center">Decripcion</TableCell>
                        <TableCell align="center">Acción</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {actividadFormativa.actividades_formativas.map(
                        (actividad, index) => (
                          <TableRow key={index}>
                            <TableCell scope="row" align="left" className="actividadDescripcion">
                              <div>
                                {actividad}
                              </div>
                            </TableCell>
                            <TableCell align="center" className="actividadAccion">
                              <Button 
                                variant="contained"
                                sx={{ backgroundColor: "red"}} 
                                type="button"
                                size="small"
                                onClick={() => eliminarActividadLista(index)}
                              >
                                Eliminar
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <div>
              <BotonGeneral
                tipo="submit"
                camposCargados={actividadFormativa.actividades_formativas.length}
                accion="Cargar"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
