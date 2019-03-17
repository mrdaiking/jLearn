import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { AppState } from "./store";

import { SystemState } from "./store/system/types";
import { updateSession } from "./store/system/actions";

import { ChatState } from "./store/chat/types";
import { sendMessage } from "./store/chat/actions";

import { thunkSendMessage } from "./thunk";

import { View, Text, StyleSheet } from "react-native";

interface AppProps {
    sendMessage: typeof sendMessage;
    updateSession: typeof updateSession;
    chat: ChatState;
    system: SystemState;
    thunkSendMessage: any;
}

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>;



interface Props { };
class Main extends Component<AppProps> {
    componentDidMount() {
        this.props.updateSession({
            loggedIn: true,
            session: "my_session",
            userName: "myName"
        });
        this.props.sendMessage({
            user: "Chat Bot",
            message:
                "This is a very basic chat application written in typescript using react and redux. Feel free to explore the source code.",
            timestamp: new Date().getTime()
        });

        this.props.thunkSendMessage("This message was sent by a thunk!");
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{this.props.system.userName}</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const mapStateToProps = (state: AppState) => ({
    system: state.system,
    chat: state.chat
});

export default connect(
    mapStateToProps,
    { sendMessage, updateSession, thunkSendMessage }
)(Main);