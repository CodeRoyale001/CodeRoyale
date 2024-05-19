import {createSlice} from "@reduxjs/toolkit";


interface User {
    isLoggedIn: boolean;
}

const initialState: User = {
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: User) => {
            state.isLoggedIn = true;
        },
        logout: (state: User) => {
            state.isLoggedIn = false;
        }
    }
})


// actions
export const {login, logout} = userSlice.actions 

// selectors

export default userSlice.reducer
