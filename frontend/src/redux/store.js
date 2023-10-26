import { configureStore } from '@reduxjs/toolkit';
import calificacionReducer from './calificacionSlice'
import LimpiarCalificacion from './calificacionSlice'
import idExamenCalificacion from './calificacionSlice'

export const store = configureStore({
   reducer: {
    calificacion: calificacionReducer,
    idExamen: idExamenCalificacion,
    limpiar: LimpiarCalificacion
   },
});

export default store;