import { configureStore } from '@reduxjs/toolkit';
import calificacionReducer from './calificacionSlice'

export const store = configureStore({
   reducer: {
    calificacion: calificacionReducer,
   },
});

export default store;