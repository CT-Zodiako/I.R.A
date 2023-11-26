import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export const InputSeleccion = ({ seleccionar, idSeleccion, label, variable, onvalue }) => {
    const inicial = onvalue || '';
    const [resultadoAprendizaje, setResultadoAprendizaje] = useState(inicial);
    
    useEffect(() => {
        setResultadoAprendizaje(inicial);
    }, [inicial]);
    
    const onOpcionSeleccion = (event) => {
        const selectedId = event.target.value;
        setResultadoAprendizaje(selectedId);
        idSeleccion(selectedId);
    }

    return(
        <>
            <FormControl sx={{ m: 1, minWidth: 320, height: 50 }}>
                <InputLabel id="demo-simple-select-label"> { label } </InputLabel>
                <Select
                    value={ resultadoAprendizaje }
                    label={ label }
                    onChange={onOpcionSeleccion}
                >
                {seleccionar.map(opcion => (
                        <MenuItem 
                            key={opcion.id} 
                            value={opcion.id}
                            // onChange={onOpcionSeleccion}
                            >{opcion[variable]}
                        </MenuItem>
                ))}
                </Select>
            </FormControl>
        </>
    )
}
