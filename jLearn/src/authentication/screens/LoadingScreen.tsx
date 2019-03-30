
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
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { thunkCheckLoggedIn } from '../store/thunk';
// import console = require("console");
interface AppProps {
    authentication: AuthenticationState,

}
interface BaseScreenProps {
    navigation: NavigationScreenProp<NavigationNavigateActionPayload>
}

interface DispatchInjectedProps {
    checkLoggedIn: typeof thunkCheckLoggedIn
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
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
    }

    componentDidMount() {
        this.checkLoggedIn();
        console.log("---SESSION---LOG---", this.props.authentication.user)
    }

    checkLoggedIn = async () => {
        await this.props.checkLoggedIn();
        this.props.navigation.navigate(this.props.authentication.user ? 'App' : 'Auth')
    }

    render() {
        console.log("--SHOULD-UPDATE-PROPS-", this.props.authentication)
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
    authentication: state.session,
});
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchInjectedProps => ({
    checkLoggedIn: bindActionCreators(thunkCheckLoggedIn, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);