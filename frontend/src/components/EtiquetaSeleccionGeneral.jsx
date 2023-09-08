import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const InputSeleccion = ({seleccion}) => {
    
    const [seleccionar, setSeleccion] = useState();

    const handleChange = (e) => {
        setSeleccion(e.target.value);
    }
    
    return(
        <>
            <FormControl sx={{ m: 1, minWidth: 320, height: 50 }}>
                <InputLabel id="demo-simple-select-label">Seleccione evaluador</InputLabel>
                <Select
                    value={seleccion.id}
                    label="Seleccione evaluador"
                    onChange={handleChange}
                >
                {
                    seleccion.map(opcion => (
                        <MenuItem key={opcion.id} value={opcion.id}>{opcion.titulo}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
        </>
    )
}
