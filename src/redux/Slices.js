import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: [],
    token: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userDetails: (state, action) => {
            state.user = action.payload
        },
        userToken: (state, action) => {
            state.token = action.payload

        },
        clearUserToken: (state, action) => {
            state.token = ""
        }

    },
})

export const { userDetails, userToken, clearUserToken } = authSlice.actions

export default authSlice.reducer