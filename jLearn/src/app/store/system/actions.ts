// src/store/system/actions.ts

import { SystemState, UPDATE_SESSION } from './types';
import { GET_LEVEL_ACTION_REQUEST, GET_LEVEL_ACTION_SUCCESS, GET_LEVEL_ACTION_FAILURE } from './systemActionConstant';

export function updateSession(newSession: SystemState) {
    return {
        type: UPDATE_SESSION,
        payload: newSession
    }
}

export function getLevelRequest(levelRequest?: string) {
    return {
        type: GET_LEVEL_ACTION_REQUEST,
        payload: levelRequest
    }
}
export function getLevelSuccess(levelRespone?: string) {
    return {
        type: GET_LEVEL_ACTION_SUCCESS,
        payload: levelRespone
    }
}
export function getLevelFailure() {
    return {
        type: GET_LEVEL_ACTION_FAILURE,
    }
}

