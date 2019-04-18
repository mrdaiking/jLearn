import { GET_GRAMMARS_ACTION_REQUEST, GET_GRAMMARS_ACTION_SUCCESS, GET_GRAMMARS_ACTION_FAILURE } from "./actionConstants";

type GetGrammarsRequest = {
    type: typeof GET_GRAMMARS_ACTION_REQUEST,
    payload: string
}

type GetGrammarsSuccess = {
    type: typeof GET_GRAMMARS_ACTION_SUCCESS,
    payload: any
}

type GetGrammarsFailure = {
    type: typeof GET_GRAMMARS_ACTION_FAILURE
}

export type GetGrammarsActionsTypes = GetGrammarsRequest | GetGrammarsSuccess | GetGrammarsFailure;