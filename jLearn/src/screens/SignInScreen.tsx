/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload } from "react-navigation";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import AwesomeButton from "../components/AwesomeButton";
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

class SignInScreen extends React.Component<Props, State> {
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
            <View style={styles.container}>
                <Text>Login</Text>
                <Text style={{ color: 'red' }}>
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
                <AwesomeButton
                    buttonColor="#8A2BE2"
                    fontSize={19}
                    title={"Login"}
                    _onPressFunc={this.handleLogin}
                />
                <Button
                    title="Don't have an account? Sign Up"
                    onPress={() => this.props.navigation.navigate('RegisterScreen')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})

export default connect(null, null)(SignInScreen);