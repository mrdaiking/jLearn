import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
    loginWithEmailAndPasswordRequest,
    loginWithEmailAndPasswordSuccess,
    loginWithEmailAndPasswordFailure,
    signOutRequest,
    signOutSuccess,
    signOutFailure
} from "./actions";
import { ResetGrammarsSuccess } from '../../grammar/store/actions';
import { AppState } from "../../app/store";
import { loginEmailAndPassword, logOut } from "../services";
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
export const thunkLogOut = (
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    try {
        dispatch(signOutRequest());
        const response = await SessionServices.logOut();
        console.log('--LOG-RES-THUNK--LOGOUT--', response)
        if (response) {
            dispatch(signOutSuccess());
            dispatch(ResetGrammarsSuccess())
        } else {
            dispatch(signOutFailure());
        }
        // console.log('--LOG-RES-THUNK--', response)
    } catch (error) {
        dispatch(signOutFailure());
    }

};

