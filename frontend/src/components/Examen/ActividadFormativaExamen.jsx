import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarActividad } from "../../redux/examenSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

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
      <div className="informacion" >
        <form onSubmit={onEnviarActividad}>
          <div>
            <h3>Actividad Formativa</h3>
            <div>
              <TextField
                type="text"
                name="descripcion"
                onChange={onActividadFormativa}
                id="outlined-basic"
                label="Descripción actividad"
                required
              />
              {/* <input
                    type="text"
                    onChange={onActividadFormativa}
                    placeholder="Descripción actividad"
                /> */}
              <button type="button" onClick={onAgregarActividad}>
                Agregar Actividad
              </button>
            </div>
            <div>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
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
                            <button
                              type="button"
                              onClick={() => eliminarActividadLista(index)}
                            >
                              Eliminar
                            </button>
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
            <button type="submit" disabled={!camposCargados}>
              Cargar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
