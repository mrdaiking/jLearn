
/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload } from "react-navigation";
import { connect } from "react-redux";
import firebase from 'react-native-firebase';
import { AuthenticationState } from "../models/interface";
import { AppState } from "../../app/store";

// import console = require("console");
interface AppProps {
    authentication: AuthenticationState
}
interface BaseScreenProps {
    navigation: NavigationScreenProp<NavigationNavigateActionPayload>
}

interface DispatchInjectedProps {
}

interface StateInjectedProps {

}

interface Props extends DispatchInjectedProps, StateInjectedProps, BaseScreenProps, AppProps { }

interface State {
    isLoading: boolean
}

class LoadingScreen extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        console.log("---SESSION---LOG---", this.props.authentication.user)
        firebase.auth().onAuthStateChanged(user => {
            console.log("---SESSION---LOG-FIREBASE---", user)
            this.props.navigation.navigate(user ? 'App' : 'Auth')
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large" />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    authentication: state.session
});



export default connect(mapStateToProps, null)(LoadingScreen);