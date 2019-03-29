import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { AppState } from "./store";

import { SystemState } from "./store/system/types";
import { updateSession } from "./store/system/actions";

import { ChatState } from "./store/chat/types";
import { sendMessage } from "./store/chat/actions";

import { thunkSendMessage } from "./thunk";
import Orientation, { orientation } from "react-native-orientation";
import Navigator from "./navigation/Navigator";
import { View, Text, StyleSheet } from "react-native";

interface AppProps {
    // sendMessage: typeof sendMessage;
    // updateSession: typeof updateSession;
    // chat: ChatState;
    // system: SystemState;
    // thunkSendMessage: any;
}

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>;



interface Props { };
class Main extends Component<AppProps> {
    // componentDidMount() {
    //     this.props.updateSession({
    //         loggedIn: true,
    //         session: "my_session",
    //         userName: "myName"
    //     });
    //     this.props.sendMessage({
    //         user: "Chat Bot",
    //         message:
    //             "This is a very basic chat application written in typescript using react and redux. Feel free to explore the source code.",
    //         timestamp: new Date().getTime()
    //     });

    //     this.props.thunkSendMessage("This message was sent by a thunk!");
    // }
    render() {
        return (<Navigator />);
    }
}

export default connect(null, null)(Main);
