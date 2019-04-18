import {
    GET_GRAMMARS_ACTION_REQUEST,
    GET_GRAMMARS_ACTION_SUCCESS,
    GET_GRAMMARS_ACTION_FAILURE
} from "../store/actionConstants";
import { GrammarsState } from "../models/interface";
import { GetGrammarsActionsTypes } from "./type";
import { GrammarListModel } from "../models/response";

const initialState: GrammarsState = {
    grammars: [],
}

export function grammarsReducer(
    state = initialState,
    action: GetGrammarsActionsTypes
): GrammarsState {
    switch (action.type) {
        case GET_GRAMMARS_ACTION_REQUEST:
            return {
                ...state
            }
        case GET_GRAMMARS_ACTION_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case GET_GRAMMARS_ACTION_FAILURE:
            return {
                ...state,
            }
        default:
            return state;
    }
}