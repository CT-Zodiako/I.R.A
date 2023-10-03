import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const InputSeleccionCalificacion = ({seleccionar, idSeleccion}) => {

    const [calificacion, setCalificacion] = useState('');

    const handleChange = (event) => {
        const selectedId = event.target.label;
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
                    onChange={handleChange}
                >
                {
                    seleccionar.map((opcion, index) => (
                        <MenuItem 
                            key={index} 
                            value={opcion.label}
                            style={{ color: opcion.color }}
                            >{opcion.value}
                        </MenuItem>
                    ))
                }
                </Select>
            </FormControl>
        </>
    )
}
