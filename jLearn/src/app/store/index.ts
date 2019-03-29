import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { systemReducer } from "./system/reducers";
import { chatReducer } from "./chat/reducers";
import { authenticationReducer } from "../../authentication/store/reducer";

const rootReducer = combineReducers({
    system: systemReducer,
    chat: chatReducer,
    session: authenticationReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    )

    return store;
}