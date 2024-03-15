import { createSlice } from "@reduxjs/toolkit"

const botonAlertaSelect = {
    botonAlerta: false,
    notificacion: "",
}

export const botonAlertaSlice = createSlice({
    name: "botonAlerta",
    initialState: botonAlertaSelect,
    reducers: {
        cambiarEstadoBoton: (state, action) => {
            const { botonAlerta, notificacion } = action.payload;
            state.botonAlerta = botonAlerta;
            state.notificacion = notificacion;
        },
    },
})

export const { cambiarEstadoBoton } = botonAlertaSlice.actions;
export default botonAlertaSlice.reducer;