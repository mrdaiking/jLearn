import {
    REGISTER_ACTION_REQUEST,
    LOGIN_ACTION_REQUEST,
    LOGIN_ACTION_FAILURE,
    LOGIN_ACTION_SUCCESS,
    CHECK_LOGGED_IN_ACTION_REQUEST,
    CHECK_LOGGED_IN_ACTION_SUCCESS,
    CHECK_LOGGED_IN_ACTION_FAILURE
} from "../store/actionContants";
import { UserRegister, UserLogin } from "../models/request";

export function registerAccount(user: UserRegister) {
    return {
        type: REGISTER_ACTION_REQUEST,
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

export function loginWithEmailAndPasswordSuccess(user: any) {
    return {
        type: LOGIN_ACTION_SUCCESS,
        payload: user
    }
}

export function loginWithEmailAndPasswordFailure() {
    return {
        type: LOGIN_ACTION_FAILURE,
    }
}

export function checkExistedAccountLoggInRequest() {
    return {
        type: CHECK_LOGGED_IN_ACTION_REQUEST
    }
}
export function checkExistedAccountLoggInSuccess(user: any) {
    return {
        type: CHECK_LOGGED_IN_ACTION_SUCCESS,
        payload: user
    }
}
export function checkExistedAccountLoggInFailure() {
    return {
        type: CHECK_LOGGED_IN_ACTION_FAILURE
    }
}