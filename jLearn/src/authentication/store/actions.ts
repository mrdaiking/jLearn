import { REGISTER, LOGIN_ACTION_REQUEST, LOGIN_ACTION_FAILURE, LOGIN_ACTION_SUCCESS } from "../store/actionContants";
import { UserRegister, UserLogin } from "../models/request";
// import console = require("console");
export function registerAccount(user: UserRegister) {
    return {
        type: REGISTER,
        payload: user
    }
}

export function loginWithEmailAndPasswordRequest(email: string, password: string) {
    console.log("---LOG--IN-ACTION--", email)
    console.log("---LOG--IN-ACTION--", password)
    return {
        type: LOGIN_ACTION_REQUEST,
        payload: {
            email,
            password
        }
    }
}

export function loginWithEmailAndPasswordSuccess() {
    console.log("---LOG--IN-ACTION--SUCESS")
    return {
        type: LOGIN_ACTION_SUCCESS,
    }
}

export function loginWithEmailAndPasswordFailure() {
    console.log("---LOG--IN-ACTION--FAILE")
    return {
        type: LOGIN_ACTION_FAILURE,
    }
}