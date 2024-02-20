import { createSlice } from "@reduxjs/toolkit"

const IdExamenInforme = {
    idInforme: 45,
}

export const idExamenInformeSlice = createSlice({
    name: "idExamenInforme",
    initialState: IdExamenInforme,
    reducers: {
        guardarInformeId: (state, action) => {
            const { idExamen } = action.payload;
            state.idInforme = idExamen;
        }
    }
})

export const { guardarInformeId } = idExamenInformeSlice.actions;
export default idExamenInformeSlice.reducer;