import { createSlice } from "@reduxjs/toolkit";

const sesion = {
    username: '',
    password: '',
    rol: ''
}

export const inicioSesionSlice = createSlice({
    name: "sesion",
    initialState: sesion,
    reducers:{
        iniciarSesion: (state, action) => {
            const {username, password, rol} = action.payload;
            state.username = username;
            state.password = password;
            state.rol = rol;
        },
        cerrarSesion: () => {
            state.username = '';
            state.password = '';
            state.rol = '';
        }
    }
});

export const { iniciarSesion, cerrarSesion } = inicioSesionSlice.actions;
export default inicioSesionSlice.reducer;
