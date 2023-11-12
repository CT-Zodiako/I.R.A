import { createSlice } from "@reduxjs/toolkit";

const examenFormulario = {
    programa_id: '',
    resultado_aprendizaje_id: '',
    proyecto_integrador: '',
    evaluadores_ids: [],
    actividades_formativas: [],
    estudiantes: []
};

export const examenFormularioSlice = createSlice({
    name: "examenForm",
    initialState: examenFormulario,
    reducers:{
        agregaInformacion:() => {
            const { programa_id, resultado_aprendizaje_id, proyecto_integrador } = action.payload;
            state.programa_id = programa_id;
            state.resultado_aprendizaje_id = resultado_aprendizaje_id;
            state.proyecto_integrador = proyecto_integrador;
        },
        agregarEvaluador:(state, action) => {
            const { evaluadores_ids } = action.payload;
            state.evaluadores_ids = evaluadores_ids;
        },
        eliminarEvaluador:(state, action) =>{
            const { nuevoFormularioExamen } = action.payload;
            state.examenFormulario = nuevoFormularioExamen;
        },
        agregarActividad:(state) => {
            const { descripcion } = action.payload;
            state.descripcion = descripcion;
        },
        eliminarActividad:(state, action) =>{
            const { nuevoFormularioExamen } = action.payload;
            state.examenFormulario = nuevoFormularioExamen;
        },
        agregarEstudiantes:(state, action) => {
            const { estudiantes } = action.payload;
            state.estudiantes = estudiantes;
        },
        eliminarEstudiantes:(state, action) => {
            const { nuevoFormularioExamen } = action.payload;
            state.examenFormulario = nuevoFormularioExamen; 
        }
    }
});

export const { agregarEvaluador, eliminarEvaluador, agregarActividad, eliminarActividad } = examenFormularioSlice.actions;
export default examenFormularioSlice.reducer;
