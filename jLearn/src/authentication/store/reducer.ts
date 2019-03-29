import { REGISTER, LOGIN_ACTION_REQUEST } from "../store/actionContants";
import { AuthenticationState } from "../models/interface";
import { AuthenticationActionTypes } from "./type";
// import console = require("console");
const initialState: AuthenticationState = {
    loggedIn: false,
    user: undefined,
    isLoading: false
};

export function authenticationReducer(
    state = initialState,
    action: AuthenticationActionTypes
): AuthenticationState {
    switch (action.type) {
        case REGISTER: {
            return {
                ...state,
                ...action.payload
            }
        }
        case LOGIN_ACTION_REQUEST: {
            console.log('--IN REDUCER--', action.payload)
            return {
                ...state,
                ...action.payload
            }
        }

        default:
            return state;
    }
}