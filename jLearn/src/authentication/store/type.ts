import { REGISTER, LOGIN_ACTION_REQUEST, LOGIN_ACTION_SUCCESS, LOGIN_ACTION_FAILURE } from "./actionContants";
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

export type AuthenticationActionTypes = RegisterAccount | LoginActionsRequest | LoginActionsSuccess | LoginActionsFailure;