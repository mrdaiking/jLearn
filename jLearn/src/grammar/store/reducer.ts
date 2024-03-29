import {
    GET_GRAMMARS_ACTION_REQUEST,
    GET_GRAMMARS_ACTION_SUCCESS,
    GET_GRAMMARS_ACTION_FAILURE,
    RESET_GRAMMARS_ACTION_REQUEST,
    RESET_GRAMMARS_ACTION_SUCCESS,
    RESET_GRAMMARS_ACTION_FAILURE
} from "../store/actionConstants";
import { GrammarsState } from "../models/interface";
import { GetGrammarsActionsTypes } from "./type";
// import { GrammarListModel } from "../models/response";

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
            // console.log("--REDUCER--", action.payload)
            return {
                ...state,
                grammars: action.payload
            }
        case GET_GRAMMARS_ACTION_FAILURE:
            return {
                ...state,
            }
        case RESET_GRAMMARS_ACTION_SUCCESS:
            return {
                ...state,
                grammars: []
            }
        default:
            return state;
    }
}