

import * as React from "react";
import { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./store";
import Main from "./Main";

const store = configureStore();

interface Props { }
interface State { }
export default class App extends Component<Props, State> {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}
