import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        value: [],
    },
    reducers: {
        setData: (state,action) => {state.value = action.payload}
    },
})

export const {setData} = dataSlice.actions

export const fetchData = (sd = new Date(), ed = new Date()) => async dispatch => {
    // format start year month date
    const symd =[ sd.getFullYear(), sd.getMonth() < 10 ? '0' + sd.getMonth() : sd.getMonth(),  sd.getDate() < 10 ? '0' + sd.getDate() : sd.getDate()].join('-')
    // format end year month date
    const eymd =[ ed.getFullYear(), ed.getMonth() < 10 ? '0' + ed.getMonth() : ed.getMonth(),  ed.getDate() < 10 ? '0' + ed.getDate() : ed.getDate()].join('-')
    const response = await fetch(`https://www.masslottery.com/rest/keno/getDrawsByDateRange?startDate=${symd}&endDate=${eymd}`)
    const responseData = await response.json()
    dispatch(setData(responseData.draws))
}

export const selectData = state => state.data.value;

export default dataSlice.reducer;
