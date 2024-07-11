import { deleteCookie } from "@/utils/cookies";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    isLoggedIn: boolean;
    userName: string;
}

const initialState: User = {
    isLoggedIn: false,
    userName: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: User, action: PayloadAction<string>) => {
            state.isLoggedIn = true;
            state.userName = action.payload; // Set the userName from the payload
        },
        logout: (state: User) => {
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            deleteCookie("userName");
            deleteCookie("userId");
            state.isLoggedIn = false;
            state.userName = ""; // Clear the userName
        },
    }
})

// actions
export const { login, logout } = userSlice.actions;

// selectors
export const selectIsLoggedIn = (state: { user: User }) => state.user.isLoggedIn;
export const selectUserName = (state: { user: User }) => state.user.userName;

export default userSlice.reducer;
