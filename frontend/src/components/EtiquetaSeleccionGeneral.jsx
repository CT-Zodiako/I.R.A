import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const InputSeleccion = ({seleccion, seleccionIdRA}) => {
    
    const [resultadoAprendizaje, setResultadoAprendizaje] = useState('');

    const handleChange = (event) => {
        const selectedId = event.target.value;
        setResultadoAprendizaje(selectedId);
        seleccionIdRA(selectedId); 
    }

    return(
        <>
            <FormControl sx={{ m: 1, minWidth: 320, height: 50 }}>
                <InputLabel id="demo-simple-select-label">Seleccione evaluador</InputLabel>
                <Select
                    value={resultadoAprendizaje}
                    label="Seleccione evaluador"
                    onChange={handleChange}
                >
                {
                    seleccion.map(opcion => (
                        <MenuItem 
                            key={opcion.id} 
                            value={opcion.id}
                            onChange={handleChange}
                            >{opcion.titulo}
                        </MenuItem>
                    ))
                }
                </Select>
            </FormControl>
        </>
    )
}
