import {
    REGISTER,
    LOGIN_ACTION_REQUEST,
    LOGIN_ACTION_SUCCESS,
    LOGIN_ACTION_FAILURE,
    SIGN_OUT_ACTION_REQUEST,
    SIGN_OUT_ACTION_SUCCESS,
    SIGN_OUT_ACTION_FAILURE
} from "./actionContants";
import { UserRegister, UserLogin } from "../models/request";
interface RegisterAccount {
    type: typeof REGISTER;
    payload: UserRegister
}
type LoginActionsRequest = {
    type: typeof LOGIN_ACTION_REQUEST;
    payload: UserLogin
}
interface LoginActionsSuccess {
    type: typeof LOGIN_ACTION_SUCCESS;
}
interface LoginActionsFailure {
    type: typeof LOGIN_ACTION_FAILURE;
}

type SignOutActionRequest = {
    type: typeof SIGN_OUT_ACTION_REQUEST,
}
type SignOutActionSuccess = {
    type: typeof SIGN_OUT_ACTION_SUCCESS,
}
type SignOutActionFailure = {
    type: typeof SIGN_OUT_ACTION_FAILURE,
}

export type AuthenticationActionTypes =
    RegisterAccount |
    LoginActionsRequest |
    LoginActionsSuccess |
    LoginActionsFailure |
    SignOutActionRequest |
    SignOutActionSuccess |
    SignOutActionFailure;;