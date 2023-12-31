import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const InputSeleccionCalificacion = ({seleccionar, idSeleccion}) => {

    const [calificacion, setCalificacion] = useState('');

    const onSeleccionCalificacion = (event) => {
        const selectedId = event.target.value;
        setCalificacion(selectedId);
        idSeleccion(selectedId); 
    }
    
    return(
        <>
            <FormControl sx={{ m: 1, minWidth: 320, height: 50 }}>
                <InputLabel id="demo-simple-select-label">Seleccione calificacion</InputLabel>
                <Select
                    value={calificacion}
                    label="Seleccione calificacion"
                    onChange={onSeleccionCalificacion}
                >
                {
                    seleccionar.map((opcion, index) => (
                        <MenuItem 
                            key={index} 
                            value={opcion.label}
                            style={{ background: opcion.color }}
                            >{opcion.value}
                        </MenuItem>
                    ))
                }
                </Select>
            </FormControl>
        </>
    )
}
