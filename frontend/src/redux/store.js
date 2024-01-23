import { configureStore } from '@reduxjs/toolkit';
import calificacionReducer from './calificacionSlice'
import LimpiarCalificacion from './calificacionSlice'
import idExamenCalificacion from './calificacionSlice'
import iniciarSesion from './inicioSesionSlipe';
import cerrarSesion from './inicioSesionSlipe';
import examenFormularioReducer from './examenSlice';

export const store = configureStore({
   reducer: {
    calificacion: calificacionReducer,
    idExamen: idExamenCalificacion,
    limpiar: LimpiarCalificacion,
    sesion: iniciarSesion,
    cerrarSesion: cerrarSesion,
    examenFormulario: examenFormularioReducer
   },
});

export default store;