import { createSlice } from "@reduxjs/toolkit"

const botonAlertaSelect = {
    botonAlerta: false,
}

export const botonAlertaSlice = createSlice({
    name: "botonAlerta",
    initialState: botonAlertaSelect,
    reducers: {
        cambiarEstadoBoton: (state, action) => {
            const { botonAlerta } = action.payload;
            state.botonAlerta = botonAlerta;
        },
    },
})

export const { cambiarEstadoBoton } = botonAlertaSlice.actions;
export default botonAlertaSlice.reducer;