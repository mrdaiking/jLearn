import {
    REGISTER_ACTION_REQUEST,
    LOGIN_ACTION_REQUEST,
    LOGIN_ACTION_SUCCESS,
    LOGIN_ACTION_FAILURE,
    CHECK_LOGGED_IN_ACTION_REQUEST,
    CHECK_LOGGED_IN_ACTION_SUCCESS,
    CHECK_LOGGED_IN_ACTION_FAILURE
} from "../store/actionContants";
import { AuthenticationState } from "../models/interface";
import { AuthenticationActionTypes } from "./type";

const initialState: AuthenticationState = {
    loggedIn: false,
    user: undefined,
    isLoading: false,

};

export function authenticationReducer(
    state = initialState,
    action: AuthenticationActionTypes
): AuthenticationState {
    switch (action.type) {
        case REGISTER_ACTION_REQUEST: {
            return {
                ...state,
                ...action.payload
            }
        }
        case LOGIN_ACTION_REQUEST: {
            console.log('--LOGGED_IN_REQUEST--', action.payload)
            return {
                ...state,
                ...action.payload
            }
        }
        case LOGIN_ACTION_SUCCESS: {
            console.log('--LOGGED_IN_SUCCESS--', action.payload)
            return {
                ...state,
                user: action.payload
            }
        }
        case LOGIN_ACTION_FAILURE: {
            console.log('--LOGGED_IN_FAILURE--')
            return {
                ...state,
            }
        }
        case CHECK_LOGGED_IN_ACTION_REQUEST: {
            console.log('--CHECK_LOGGED_IN_ACTION_REQUEST--')
            return {
                ...state
            }
        }
        case CHECK_LOGGED_IN_ACTION_SUCCESS: {
            console.log('--CHECK_LOGGED_IN_ACTION_SUCCESS--', action.payload)
            return {
                ...state,
                user: action.payload
            }
        }
        case CHECK_LOGGED_IN_ACTION_FAILURE: {
            console.log('--CHECK_LOGGED_IN_ACTION_FAILURE--')
            return {
                ...state
            }
        }
        default:
            return state;
    }
}