import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        value: 0,
    },
    reducers: {
        nextPage: state => {state.value +=1},
        prevPage: state => {state.value -=1},
    },
})

export const {nextPage, prevPage} = pageSlice.actions

export const selectPage = state => state.page.value;

export default pageSlice.reducer;
