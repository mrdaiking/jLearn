import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
    loginWithEmailAndPasswordRequest,
    loginWithEmailAndPasswordSuccess,
    loginWithEmailAndPasswordFailure,
    checkExistedAccountLoggInRequest,
    checkExistedAccountLoggInSuccess,
    checkExistedAccountLoggInFailure

} from "./actions";
import { AppState } from "../../app/store";
import { loginEmailAndPassword } from "../services";
import * as SessionServices from '../services';

export const thunkLogginWithEmailAndPassword = (
    email: string,
    password: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    try {
        dispatch(loginWithEmailAndPasswordRequest(email, password));
        const response = await SessionServices.loginEmailAndPassword(email, password);
        console.log("---IN-THUNK-LOGGIN_", response)
        if (response) {
            dispatch(loginWithEmailAndPasswordSuccess(response._user));
        } else {
            dispatch(loginWithEmailAndPasswordFailure());
        }
    } catch (error) {
        dispatch(loginWithEmailAndPasswordFailure());
    }
};

export const thunkCheckLoggedIn = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    try {
        dispatch(checkExistedAccountLoggInRequest());
        const response = await SessionServices.checkLoggedIn();
        if (response) {
            dispatch(checkExistedAccountLoggInSuccess(response));
        } else {
            dispatch(checkExistedAccountLoggInFailure());
        }
    } catch (error) {
        dispatch(checkExistedAccountLoggInFailure());
    }
}

