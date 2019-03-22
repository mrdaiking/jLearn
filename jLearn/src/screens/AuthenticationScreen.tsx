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
import CustomTextInput from "../components/CustomTextInput";
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
                    <Text style={{ fontSize: 50 }}>LOGO</Text>
                </View>
                <View style={styles.labelPageContainer}>
                    <Text style={styles.labelPage}>Login</Text>
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
                            start={{ x: 1.0, y: 0.0 }} end={{ x: 0.0, y: 0.5 }}
                            locations={[0, 1]}
                            colors={['#C79FFF', '#AAAAFD']}
                            style={styles.linearGradient}>
                            <CustomTextInput
                                label="Email"
                                placeHolder="Your email..."
                                iconName='email'
                            />
                            <CustomTextInput
                                label="Password"
                                placeHolder="Your password..."
                                iconName="vpn-key"
                            />
                            <View style={styles.forgotButtonContainer}>
                                <TouchableOpacity style={styles.forgotButton}>
                                    <Text style={styles.forgotButtonText}>Forgot password?</Text>
                                </TouchableOpacity>
                            </View>

                        </LinearGradient>

                    </View>
                    <View style={styles.loginButtonWraper}>
                        <TouchableOpacity>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#AAAAFD', '#C79FFF',]}
                                style={styles.loginButtonContainer}
                            >
                                <Text style={styles.loginButtonText}>Login</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.bottomView}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text>SIGN UP</Text>
                    </TouchableOpacity>
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
        backgroundColor: "#F8F8F8"
    },
    labelPageContainer: {
        // height: 50,
        width: "100%",
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    labelPage: {
        color: '#AAAAFD',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    linearGradient: {
        height: 300,
        paddingHorizontal: 15,
        paddingTop: 40,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    forgotButtonContainer: {
        width: "100%",
        alignItems: 'flex-end'
    },
    forgotButton: {
        height: 30,
        width: 140,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 15
    },
    forgotButtonText: {
        color: '#1F2041'
    },
    loginButtonWraper: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    loginButtonContainer: {
        height: 50,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 20
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
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center"
    },
    tabComponent: {
        flex: 4,
        width: "100%",
    },
    groupButton: {
        flex: 2,
        backgroundColor: "green"
    },
    form: {
        flex: 5,
        padding: 20
    },
    bottomView: {
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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