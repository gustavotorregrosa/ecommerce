import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from './user.interface'

interface UserState extends IUser {}

const initialState: UserState = {

    id: '',
    name: '',
    email: '',
    access_refresh_token: '',
    access_token: ''

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            console.log({state})
            console.log({action})
            state = action.payload
            return action.payload
        },

        logout: (state) => {
            state = initialState
        },

        renewAccessToken: (state, action: PayloadAction<string>) => {
            state.access_token = action.payload
        },

        renewRefreshAccessToken: (state, action: PayloadAction<string>) => {
            state.access_refresh_token = action.payload
        }
    }
})

export const {login, logout, renewAccessToken, renewRefreshAccessToken} = userSlice.actions

export default userSlice.reducer