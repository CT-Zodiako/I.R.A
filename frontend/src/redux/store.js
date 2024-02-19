import { configureStore } from '@reduxjs/toolkit';
import calificacionReducer from './calificacionSlice'
import LimpiarCalificacion from './calificacionSlice'
import idExamenCalificacion from './calificacionSlice'
import iniciarSesion from './inicioSesionSlipe';
import cerrarSesion from './inicioSesionSlipe';
import examenFormularioReducer from './examenSlice';
import programa from './programaSlice';
import botonAlertaSlice from './botonAlertaSlice';

export const store = configureStore({
   reducer: {
    calificacion: calificacionReducer,
    idExamen: idExamenCalificacion,
    limpiar: LimpiarCalificacion,
    sesion: iniciarSesion,
    cerrarSesion: cerrarSesion,
    examenFormulario: examenFormularioReducer,
    programa: programa,
    botonAlerta: botonAlertaSlice,
   },
});

export default store;