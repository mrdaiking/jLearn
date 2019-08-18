import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { getLevelRequest, getLevelSuccess, getLevelFailure } from "./actions";
import { AppState } from "../../store";
import { level } from '../../constants';

export const thunkGetLevel = (
    requestLevel?: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    try {
        dispatch(getLevelRequest(requestLevel));
        const response = await level.getLevelFromLocal(requestLevel)
        // console.log('---RESPONSE---', response);
        if (response) {
            dispatch(getLevelSuccess(response));
        } else {
            dispatch(getLevelFailure());
        }
    } catch (error) {
        dispatch(getLevelFailure());
    }
};



