import { createSlice } from "@reduxjs/toolkit";

const calificacion = {
    calificaciones:[
        {
            nombre: "",
            calificacion:{
                notas:[],
                observacion:[]
            }
        }
    ]
};

export const calificacionSlice = createSlice({
    name: "calificacion",
    initialState: calificacion,
    reducers:{
        addCalificacion:(state, action)=>{
            const {nombre, notas, observacion} = action.payload;
            if (state.calificaciones.length === 1 && state.calificaciones[0].nombre === "" && state.calificaciones[0].calificacion.notas.length === 0 && state.calificaciones[0].calificacion.observacion.length === 0) {
                state.calificaciones = [];
            }
            const nuevaCalificacion = {
                nombre: nombre,
                calificacion: {
                    notas: notas,
                    observacion: observacion
                }
            };
            state.calificaciones.push(nuevaCalificacion);
        }
    }
});

export const { addCalificacion } = calificacionSlice.actions;
export default calificacionSlice.reducer;
