/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload } from "react-navigation";
import { connect } from "react-redux";
import firebase from 'react-native-firebase';
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

class RegisterScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false,
            email: '',
            password: '',
            errorMessage: ''
        }
        this.handleSignUp = this.handleSignUp.bind(this);
    }
    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            )
            .then(() => this.props.navigation.navigate('App'))
            .catch(error => this.setState({
                errorMessage: error.message
            }))

    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {/* {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>} */}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Sign Up" onPress={this.handleSignUp} />
                <Button
                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate('SignInScreen')}
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

export default connect(null, null)(RegisterScreen);