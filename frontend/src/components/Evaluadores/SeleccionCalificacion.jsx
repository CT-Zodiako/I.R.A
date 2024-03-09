import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react";

export const SeleccionCalificacion = ({ seleccionar, idSeleccion }) => {
    const [calificacion, setCalificacion] = useState('');

    const onSeleccionCalificacion = (event) => {
        const selectedId = event.target.value;
        setCalificacion(selectedId);
        idSeleccion(selectedId);
    }
  return (
    <>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={calificacion}
          onChange={onSeleccionCalificacion}
        >
            {seleccionar.map((opcion, index) => (
                    <FormControlLabel 
                        key={index} 
                        value={opcion.nota}
                        control={<Radio sx={{
                            color: opcion.color,
                            '&.Mui-checked': {
                              color: opcion.color,
                            },
                          }}/>} 
                        label={
                            <Typography variant="body2" fontSize="9px">
                                {opcion.label}
                            </Typography>
                        }
                    />
                ))
            }
        </RadioGroup>
      </FormControl>
    </>
  );
};
