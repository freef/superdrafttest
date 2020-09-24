import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../features/dataSlice'
import pageReducer from '../features/pageSlice'
import pinReducer from '../features/pinSlice'

export default configureStore({
    reducer: {
        data: dataReducer,
        pin: pinReducer,
        page: pageReducer
    },
});
