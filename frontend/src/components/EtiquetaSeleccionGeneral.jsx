import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export const InputSeleccion = ({ seleccionar, idSeleccion, label, variable, onvalue, anchoSelec, fondo, alto, tamano }) => {
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
                <div className="selector">
                    <InputLabel sx={{ fontSize: tamano,   position: 'absolute' }}> {label} </InputLabel>
                    <Select
                        className="seleccionarPrograma"
                        sx={{ background: fondo, height: alto, width: anchoSelec}}
                        value={ resultadoAprendizaje }
                        label={ label }
                        placeholder="Seleccionar"
                        onChange={onOpcionSeleccion}
                    >
                    {seleccionar.map(opcion => (
                            <MenuItem 
                                key={opcion.id} 
                                value={opcion.id}
                                sx={{ fontSize: '14px' }}
                            >
                                {opcion[variable]}
                            </MenuItem>
                    ))}
                    </Select>
                </div>
            </FormControl>
        </>
    )
}
