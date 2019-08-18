import {
    REGISTER,
    LOGIN_ACTION_REQUEST,
    LOGIN_ACTION_FAILURE,
    LOGIN_ACTION_SUCCESS,
    SIGN_OUT_ACTION_REQUEST,
    SIGN_OUT_ACTION_SUCCESS,
    SIGN_OUT_ACTION_FAILURE
} from "../store/actionContants";
import { UserRegister, UserLogin } from "../models/request";
// import console = require("console");
export function registerAccount(user: UserRegister) {
    return {
        type: REGISTER,
        payload: user
    }
}

export function loginWithEmailAndPasswordRequest(email: string, password: string) {
    return {
        type: LOGIN_ACTION_REQUEST,
        payload: {
            email,
            password
        }
    }
}

export function loginWithEmailAndPasswordSuccess() {
    return {
        type: LOGIN_ACTION_SUCCESS,
    }
}

export function loginWithEmailAndPasswordFailure() {
    return {
        type: LOGIN_ACTION_FAILURE,
    }
}

export function signOutRequest() {
    return {
        type: SIGN_OUT_ACTION_REQUEST
    }
}
export function signOutSuccess() {
    return {
        type: SIGN_OUT_ACTION_SUCCESS
    }
}
export function signOutFailure() {
    return {
        type: SIGN_OUT_ACTION_FAILURE
    }
}

