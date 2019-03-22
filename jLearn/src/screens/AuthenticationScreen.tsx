/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import AwesomeButton from "../components/AwesomeButton";
import LinearGradient from "react-native-linear-gradient";
interface BaseScreenProps {
    navigation: NavigationScreenProp<NavigationNavigateActionPayload>
}

interface DispatchInjectedProps {

}

interface StateInjectedProps {

}

interface Props extends DispatchInjectedProps, StateInjectedProps, BaseScreenProps {

}

interface State {
    isLoading: boolean,
    email: string,
    password: string,
    errorMessage?: string
}

class AuthenticationScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false,
            email: '',
            password: '',
            errorMessage: ''
        }
    }

    handleLogin = () => {
        //TODO: handle login
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('App'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (

            <SafeAreaView style={styles.container}>
                <View style={styles.logo}>
                    <Text>LOGO</Text>
                </View>
                <View style={styles.tabComponent}>

                    {/* <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>

                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        secureTextEntry
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <View style={styles.buttonContainer}>
                        <AwesomeButton
                            buttonColor="#FAFAFA"
                            fontSize={19}
                            title={"Login"}
                            _onPressFunc={this.handleLogin}
                        />
                    </View>

                    <Button
                        title="Don't have an account? Sign Up"
                        onPress={() => this.props.navigation.navigate('RegisterScreen')}
                    /> */}

                    <View style={styles.form}>
                        <LinearGradient
                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                            locations={[0, 0.5, 0.6]}
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={styles.linearGradient}>
                            <Text style={styles.buttonText}>
                                Sign in with Facebook
                            </Text>
                        </LinearGradient>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Text>Text</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#C383DE"
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        color: '#ffffff',
        margin: 10,
        opacity: 0.8
    },
    logo: {
        flex: 1,
        width: "100%",
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    },
    tabComponent: {
        flex: 4,
        width: "100%",
        backgroundColor: "blue",
    },
    groupButton: {
        flex: 2,
        backgroundColor: "green"
    },
    form: {
        flex: 5,
        backgroundColor: "white"
    },
    bottomView: {
        flex: 1,
        backgroundColor: "yellow",
        width: "100%"
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },

    buttonContainer: {
        width: "100%",
        paddingHorizontal: 15
    }
})

export default connect(null, null)(AuthenticationScreen);