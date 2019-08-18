import { GET_LEVEL_ACTION_REQUEST, GET_LEVEL_ACTION_SUCCESS, GET_LEVEL_ACTION_FAILURE } from './systemActionConstant';
export interface SystemState {
    loggedIn: boolean
    session: string
    userName: string,
    level: string
}
// src/store/system/types.ts
export const UPDATE_SESSION = 'UPDATE_SESSION';


interface UpdateSessionAction {
    type: typeof UPDATE_SESSION
    payload: SystemState
}

type GetLevelActionRequest = {
    type: typeof GET_LEVEL_ACTION_REQUEST,
    payload: string
}

type GetLevelActionSuccess = {
    type: typeof GET_LEVEL_ACTION_SUCCESS,
    payload: string
}

type GetLevelActionFailure = {
    type: typeof GET_LEVEL_ACTION_FAILURE,
    payload: string
}



export type SystemActionTypes =
    UpdateSessionAction |
    GetLevelActionRequest |
    GetLevelActionSuccess |
    GetLevelActionFailure;
