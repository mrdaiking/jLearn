import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { loginWithEmailAndPasswordRequest, loginWithEmailAndPasswordSuccess, loginWithEmailAndPasswordFailure } from "./actions";
import { AppState } from "../../app/store";
import { loginEmailAndPassword } from "../services";
import * as SessionServices from '../services';

export const thunkLogginWithEmailAndPassword = (
    email: string,
    password: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    // console.log('--LOG-THUNK--', email)
    // console.log('--LOG-THUNK--', password)
    try {
        dispatch(loginWithEmailAndPasswordRequest(email, password));
        const response = await SessionServices.loginEmailAndPassword(email, password);
        if (response) {
            dispatch(loginWithEmailAndPasswordSuccess());
        } else {
            dispatch(loginWithEmailAndPasswordFailure());
        }
        // console.log('--LOG-RES-THUNK--', response)
    } catch (error) {
        dispatch(loginWithEmailAndPasswordFailure());
    }

};

