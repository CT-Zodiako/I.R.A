import { createSlice } from "@reduxjs/toolkit";

const calificacion = {
    calificacionExamen: [
        {
            calificacion: [
                {
                    nombre: "",
                    calificacion: {
                        notas: [],
                        observaciones: []
                    }
                }
            ],
            examen_id: "",
            evaluador_id: ""
        }
    ]
};

export const calificacionSlice = createSlice({
    name: "calificacion",
    initialState:{
        calificacionExamen: []  
    },
    reducers: {
        idExamenCalificacion: (state, action) => {
            const { examenId, evaluadorId } = action.payload;
            
            const examenExistenteIndex = state.calificacionExamen.findIndex((examen) => examen.examen_id === examenId);
            
            if (examenExistenteIndex !== -1) {
                console.log("El ID del examen ya existe en el estado.");
                return;
            }

            const nuevoExamen = {
                calificacion: [
                    {
                        nombre: "",
                        calificacion: {
                            notas: [],
                            observaciones: []
                        }
                    }
                ],
                examen_id: examenId,
                evaluador_id: evaluadorId
            };

            state.calificacionExamen.push(nuevoExamen);
        },

        agregarCalificacion: (state, action) => {
            const { nombre, notas, observaciones } = action.payload;
        
            if (state.calificacionExamen.length === 1 && state.calificacionExamen[0].calificacion[0].nombre === "") {
                state.calificacionExamen[0].calificacion = [];
            }
        
            const estudianteExistente = state.calificacionExamen[0].calificacion.find((estudiante) => estudiante.nombre === nombre);
        
            if (estudianteExistente) {
                estudianteExistente.calificacion = {
                    notas: notas,
                    observaciones: observaciones
                };
            } else {
                const nuevaCalificacion = {
                    nombre: nombre,
                    calificacion: {
                        notas: notas,
                        observaciones: observaciones
                    }
                };
                state.calificacionExamen[0].calificacion.push(nuevaCalificacion);
            }
        },

        LimpiarCalificacion: (state) => {
            state.calificacionExamen = [
                {
                    calificacion: [
                        {
                            nombre: "",
                            calificacion: {
                                notas: [],
                                observaciones: []
                            }
                        }
                    ],
                    examen_id: "",
                    evaluador_id: ""
                }
            ];
        },
    }
});

export const { agregarCalificacion, LimpiarCalificacion, idExamenCalificacion } = calificacionSlice.actions;
export default calificacionSlice.reducer;
