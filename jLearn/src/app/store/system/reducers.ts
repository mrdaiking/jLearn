// src/store/system/reducers.ts

import {
    // SystemActions,
    SystemState,
    SystemActionTypes,
    UPDATE_SESSION
} from './types';
import { GET_LEVEL_ACTION_REQUEST, GET_LEVEL_ACTION_SUCCESS, GET_LEVEL_ACTION_FAILURE } from './systemActionConstant';
// import console = require('console');

const initialState: SystemState = {
    loggedIn: false,
    session: '',
    userName: '',
    level: 'N3'
}

export function systemReducer(
    state = initialState,
    action: SystemActionTypes
): SystemState {
    switch (action.type) {
        case UPDATE_SESSION: {
            return {
                ...state,
                ...action.payload
            }
        }
        case GET_LEVEL_ACTION_REQUEST: {
            return {
                ...state,
            }
        }
        case GET_LEVEL_ACTION_SUCCESS: {
            return {
                ...state,
                level: action.payload
            }
        }
        default:
            return state
    }
}