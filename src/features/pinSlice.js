import { createSlice } from '@reduxjs/toolkit'

export const pinSlice = createSlice({
    name: 'pin',
    initialState: {
        value: [],
    },
    reducers: {
        addPin: (state, action) => {state.value = [...state.value, action.payload]},
        removePin: (state, action) => {state.value = state.value.filter(el => el.drawNumber !== action.payload.drawNumber)} 
    },
})

export const {addPin, removePin} = pinSlice.actions

export const selectPin = state => state.pin.value;

export default pinSlice.reducer
