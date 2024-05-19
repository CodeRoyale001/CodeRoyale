// reducers.tsx
import { LOGIN_SUCCESS, LOGOUT } from './actionTypes';
import { AuthActionTypes } from './actions';

interface AuthState {
    isLoggedIn: boolean;
    role: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    role: null,
};

const rootReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                role: action.payload.role,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                role: null,
            };
        default:
            return state;
    }
};

export default rootReducer;
