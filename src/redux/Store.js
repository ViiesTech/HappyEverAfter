import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './Slices'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);
export const store = configureStore({
    reducer: {
        user: persistedReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})

export const persistor = persistStore(store)