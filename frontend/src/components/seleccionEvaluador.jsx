import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const InputSeleccionEvaluador = ({seleccionar, idSeleccion}) => {

    const [evaluadorId, setEvaluadorId] = useState('');

    const handleChange = (event) => {
        const selectedId = event.target.value;
        setEvaluadorId(selectedId);
        idSeleccion(selectedId); 
    }
    
    return(
        <>
            <FormControl sx={{ m: 1, minWidth: 320, height: 50 }}>
                <InputLabel id="demo-simple-select-label">Seleccione evaluador</InputLabel>
                <Select
                    value={evaluadorId}
                    label="Seleccione evaluador"
                    onChange={handleChange}
                >
                {
                    seleccionar.map(opcion => (
                        <MenuItem 
                            key={opcion.id} 
                            value={opcion.id}
                            >{opcion.nombre_evaluador}
                        </MenuItem>
                    ))
                }
                </Select>
            </FormControl>
        </>
    )
}
