import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/themeSlice'

export const task = configureStore({
    reducer: {
        theme: themeReducer,
    },
})