import { createSlice } from "@reduxjs/toolkit";

const programaSelect = {
    programa: ''
}

console.log("programaSelect en la store: ",programaSelect);

export const programaSlice = createSlice({
    name: "programa",
    initialState: programaSelect,
    reducers: {
        agregarPrograma: (state, action) => {
            const { programa } = action.payload;
            state.programa = programa;
        },
    },
})

export const { agregarPrograma } = programaSlice.actions;
export default programaSlice.reducer;