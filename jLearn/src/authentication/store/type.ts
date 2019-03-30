import {
    REGISTER_ACTION_REQUEST,
    LOGIN_ACTION_REQUEST,
    LOGIN_ACTION_SUCCESS,
    LOGIN_ACTION_FAILURE,
    CHECK_LOGGED_IN_ACTION_REQUEST,
    CHECK_LOGGED_IN_ACTION_SUCCESS,
    CHECK_LOGGED_IN_ACTION_FAILURE
} from "./actionContants";
import { UserRegister, UserLogin } from "../models/request";
interface RegisterAccount {
    type: typeof REGISTER_ACTION_REQUEST;
    payload: UserRegister
}
interface LoginActionsRequest {
    type: typeof LOGIN_ACTION_REQUEST;
    payload: UserLogin
}
interface LoginActionsSuccess {
    type: typeof LOGIN_ACTION_SUCCESS;
    payload: any
}
interface LoginActionsFailure {
    type: typeof LOGIN_ACTION_FAILURE;
}

interface CheckLoggedInRequest {
    type: typeof CHECK_LOGGED_IN_ACTION_REQUEST
}
interface CheckLoggedInSuccess {
    type: typeof CHECK_LOGGED_IN_ACTION_SUCCESS,
    payload: any
}
interface CheckLoggedInFailure {
    type: typeof CHECK_LOGGED_IN_ACTION_FAILURE
}
export type AuthenticationActionTypes =
    RegisterAccount |
    LoginActionsRequest |
    LoginActionsSuccess |
    LoginActionsFailure |
    CheckLoggedInRequest |
    CheckLoggedInSuccess |
    CheckLoggedInFailure;