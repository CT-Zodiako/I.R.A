import { configureStore } from '@reduxjs/toolkit';
import calificacionReducer from './calificacionSlice'
import LimpiarCalificacion from './calificacionSlice'
import idExamenCalificacion from './calificacionSlice'
import  iniciarSesion from './inicioSesionSlipe';
import  cerrarSesion from './inicioSesionSlipe';

export const store = configureStore({
   reducer: {
    calificacion: calificacionReducer,
    idExamen: idExamenCalificacion,
    limpiar: LimpiarCalificacion,
    sesion: iniciarSesion,
    cerrarSesion: cerrarSesion
   },
});

export default store;