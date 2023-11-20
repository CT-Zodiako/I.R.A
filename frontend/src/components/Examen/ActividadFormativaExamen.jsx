import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarActividad } from "../../redux/examenSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { BotonGeneral } from "../botonGeneral";

export const RegistrarActividadFormativa = ({ handleNext }) => {
  const examenForm = useSelector((state) => state.examenFormulario);
  useEffect(() => {
    console.log(examenForm);
  }, [examenForm]);

  const dispatch = useDispatch();

  const [actividaEstado, setActividaEstado] = useState();
  const [actividadFormativa, setActividadFormativa] = useState({
    actividades_formativas: [],
  });

  const [camposCargados, setCamposCargados] = useState(false);

  const onActividadFormativa = (event) => {
    setActividaEstado(event.target.value);
  };

  const onAgregarActividad = () => {
    if (actividaEstado) {
      setActividadFormativa({
        ...actividadFormativa,
        actividades_formativas: [
          ...actividadFormativa.actividades_formativas,
          actividaEstado,
        ],
      });
      setCamposCargados(true);
    }
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
    handleNext();
  };

  return (
    <>
      <div className="informacion">
        <form onSubmit={onEnviarActividad}>
          <div className="componentes">
            <h3>Actividad Formativa</h3>
            <div className="centrar">
              <div className="centrar">
                <TextField
                  sx={{ width: "21rem", margin: "10px" }}
                  id="outlined-multiline-static"
                  type="text"
                  label="Descripción actividad"
                  name="descripcion"
                  onChange={onActividadFormativa}
                  multiline
                  rows={2}
                />
              </div>
              <div className="centrar">
                <Button
                  type="button"
                  onClick={onAgregarActividad}
                  className="textButton"
                  variant="outlined"
                  size="small"
                >
                  Agregar Actividad
                </Button>
              </div>
            </div>
            <div>
              <TableContainer>
                <Table
                  sx={{ minWidth: 350, width: 550 }}
                  aria-label="caption table"
                >
                  <TableHead sx={{ background: "rgba(0, 0, 255, 0.5)" }}>
                    <TableRow>
                      <TableCell>Decripcion</TableCell>
                      <TableCell>Acción</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {actividadFormativa.actividades_formativas.map(
                      (actividad, index) => (
                        <TableRow key={index}>
                          <TableCell scope="row" align="left">
                            {actividad}
                          </TableCell>
                          <TableCell align="left">
                            <Button 
                              variant="outlined" 
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
              camposCargados={camposCargados}
              accion="Cargar"
            />
          </div>
        </form>
      </div>
    </>
  );
};
