import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
// import { GrammarListModel } from "../models/response";
import {
    getGrammarsRequest,
    getGrammarsSuccess,
    getGrammarsFailure
} from "./actions";
import { AppState } from "../../app/store";
import * as GrammarService from '../services';

export const thunkGrammarFromFireBase = (
    collectionPath: string,
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    console.log('--LOG-THUNK--', collectionPath)
    try {
        dispatch(getGrammarsRequest(collectionPath));
        const response = await GrammarService.getGrammars(collectionPath);
        if (response) {
            dispatch(getGrammarsSuccess(response));

            console.log('--LOG-THUNK--SUCCESS', response)
        } else {
            dispatch(getGrammarsFailure());
        }
    } catch (error) {
        dispatch(getGrammarsFailure());
    }
};

