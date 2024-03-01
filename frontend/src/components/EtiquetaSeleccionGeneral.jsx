import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export const InputSeleccion = ({ seleccionar, idSeleccion, label, variable, onvalue, anchoSelec, fondo, alto }) => {
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
            <FormControl sx={{ m: 1, minWidth: anchoSelec, maxHeight: 50 }}>
                <InputLabel> {label} </InputLabel>
                <Select
                    sx={{ background: fondo, height: alto}}
                    value={ resultadoAprendizaje }
                    label={ label }
                    placeholder="Seleccionar"
                    onChange={onOpcionSeleccion}
                >
                {seleccionar.map(opcion => (
                        <MenuItem 
                            key={opcion.id} 
                            value={opcion.id}
                            >{opcion[variable]}
                        </MenuItem>
                ))}
                </Select>
            </FormControl>
        </>
    )
}
