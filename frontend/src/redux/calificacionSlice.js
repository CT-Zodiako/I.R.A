import { createSlice } from "@reduxjs/toolkit";

const calificacion = {
    calificacion:[
        {
            nombre: "",
            calificacion:{
                notas:[],
                observaciones:[]
            }
        }
    ],
    examen_id: "",
    evaluador_id: ""
}

export const calificacionSlice = createSlice({
    name: "calificacion",
    initialState: calificacion,
    reducers:{
        idExamenCalificacion: (state, action) => {
            const { examenId, evaluadorId } = action.payload;
            if (state.examen_id === examenId) {
              console.log("El ID del examen ya existe en el estado.");
              return state;
            }
            return {
                ...state,
                examen_id: examenId,
                evaluador_id: evaluadorId
            };
        },
        agregarCalificacion:(state, action)=>{
            const {nombre, notas, observaciones} = action.payload;
            if (state.calificacion.length === 1 && state.calificacion[0].nombre === "") {
                state.calificacion = [];
            }
            const nuevaCalificacion = {
                nombre: nombre,
                calificacion: {
                    notas: notas,
                    observaciones: observaciones
                }
            };
            state.calificacion.push(nuevaCalificacion);
        },
        LimpiarCalificacion:(state)=>{ 
            state.calificacion = [
                {
                    nombre: "",
                    calificacion:{
                        notas:[],
                        observaciones:[]
                    }
                }
            ],
            state.examen_id = "";
        }
    }
});

export const { agregarCalificacion, LimpiarCalificacion, idExamenCalificacion } = calificacionSlice.actions;
export default calificacionSlice.reducer;
