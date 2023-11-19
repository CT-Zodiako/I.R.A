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
        agregaInformacion:(state, action) => {
            const { programa_id, resultado_aprendizaje_id, proyecto_integrador } = action.payload;
            state.programa_id = programa_id;
            state.resultado_aprendizaje_id = resultado_aprendizaje_id;
            state.proyecto_integrador = proyecto_integrador;
        },
        agregarEvaluador:(state, action) => {
            const { evaluadores_ids } = action.payload;
            state.evaluadores_ids = evaluadores_ids;
        },
        agregarActividad:(state, action) => {
            const { actividades_formativas } = action.payload;
            state.actividades_formativas = actividades_formativas;
        },
        agregarEstudiantes:(state, action) => {
            const { estudiantes } = action.payload;
            state.estudiantes = estudiantes;
        },
    }
});

export const { agregaInformacion, agregarEvaluador, agregarActividad, agregarEstudiantes } = examenFormularioSlice.actions;
export default examenFormularioSlice.reducer;
