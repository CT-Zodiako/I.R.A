import { createSlice } from "@reduxjs/toolkit";

const Inisesion = {
    id: '',
    username: '',
    rol: ''
}

export const inicioSesionSlice = createSlice({
    name: "sesion",
    initialState: Inisesion,
    reducers:{
        iniciarSesion: (state, action) => {
            const {id, username, rol} = action.payload;
            state.id = id;
            state.username = username;
            state.rol = rol;
        },
        cerrarSesion: (state) => {
            state.id = '',
            state.username = '';
            state.rol = '';
        }
    }
});

export const { iniciarSesion, cerrarSesion } = inicioSesionSlice.actions;
export default inicioSesionSlice.reducer;
