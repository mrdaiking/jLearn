/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
// import console = require("console");
interface BaseScreenProps {
    navigation: NavigationScreenProp<NavigationNavigateActionPayload>
}

interface DispatchInjectedProps {

}

interface StateInjectedProps {

}

interface HomeScreenProps extends DispatchInjectedProps, StateInjectedProps, BaseScreenProps {

}

interface HomeScreenState {
    isLoading: boolean,
    bunpoList: any[],
}

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
    aref: any;
    unsubscribe: any;
    constructor(props: HomeScreenProps) {
        super(props);
        this.aref = firebase.firestore().collection('bunpo_N3');
        this.unsubscribe = null;
        this.state = {
            isLoading: false,
            bunpoList: []
        }
        this.signOut = this.signOut.bind(this);
    }

    signOut = () => {
        firebase.auth().signOut().then((result) => {
            console.log("RESULt LOGGOUT", result)
        }).catch(error => {
            console.log("ERROR LOGOUT", error)
        })
    }
    render() {
        console.log("AREF DID", this.aref)
        return (
            <SafeAreaView style={styles.styleSafeAreaView}>
                <View style={styles.container}>
                    <Text>Home Screen</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Grammar')}
                    >
                        <Text>GRAMMAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.signOut()}
                    >
                        <Text>SIGNOUT</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    styleSafeAreaView: {
        flex: 1,
    },
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F8F8F8"
    },
})

export default connect(null, null)(HomeScreen);