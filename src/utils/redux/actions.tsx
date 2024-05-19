// actions.tsx
import { LOGIN_SUCCESS, LOGOUT } from './actionTypes';

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: {
        role: string; // Replace `string` with a specific role type if needed
    };
}

interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthActionTypes = LoginSuccessAction | LogoutAction;

export const loginSuccess = (role: string): LoginSuccessAction => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            role,
        },
    };
};

export const logout = (): LogoutAction => {
    return {
        type: LOGOUT,
    };
};
