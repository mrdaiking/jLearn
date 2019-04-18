import {
    GET_GRAMMARS_ACTION_REQUEST,
    GET_GRAMMARS_ACTION_SUCCESS,
    GET_GRAMMARS_ACTION_FAILURE
} from "./actionConstants";
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