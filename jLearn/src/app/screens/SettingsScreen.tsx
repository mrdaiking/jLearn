/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload } from "react-navigation";
import { connect } from "react-redux";
import { AppState } from "../../app/store";
import { thunkLogOut } from '../../authentication/store/thunk';
import firebase from "react-native-firebase";
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
interface BaseScreenProps {

}

interface DispatchInjectedProps {
    logOut: typeof thunkLogOut
}

interface StateInjectedProps {

}

interface Props extends DispatchInjectedProps, StateInjectedProps, BaseScreenProps {

}

interface State {
    isLoading: boolean
}

class SettingsScreen extends React.Component<Props, State> {
    signOut = () => {
        this.props.logOut();
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={() => this.signOut()}
                    style={styles.logOutBtn}>
                    <Text>Log out</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    logOutBtn: {

    }
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchInjectedProps => ({
    logOut: bindActionCreators(thunkLogOut, dispatch),
});
export default connect(null, mapDispatchToProps)(SettingsScreen);
