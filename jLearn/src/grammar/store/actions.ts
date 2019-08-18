import {
    GET_GRAMMARS_ACTION_REQUEST,
    GET_GRAMMARS_ACTION_SUCCESS,
    GET_GRAMMARS_ACTION_FAILURE,
    RESET_GRAMMARS_ACTION_REQUEST,
    RESET_GRAMMARS_ACTION_SUCCESS,
    RESET_GRAMMARS_ACTION_FAILURE
} from "./actionConstants";
// import { GrammarListModel } from "../models/response"
export function getGrammarsRequest(collection: string) {
    return {
        type: GET_GRAMMARS_ACTION_REQUEST,
        collection
    }
}

export function getGrammarsSuccess(grammars: any) {
    return {
        type: GET_GRAMMARS_ACTION_SUCCESS,
        payload: grammars
    }
}

export function getGrammarsFailure() {
    return {
        type: GET_GRAMMARS_ACTION_FAILURE,
    }
}
export function ResetGrammarsRequest() {
    return {
        type: RESET_GRAMMARS_ACTION_REQUEST,
    }
}
export function ResetGrammarsSuccess() {
    return {
        type: RESET_GRAMMARS_ACTION_SUCCESS,
    }
}
export function ResetGrammarsFailure() {
    return {
        type: RESET_GRAMMARS_ACTION_FAILURE,
    }
}