/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import { CustomTextInput } from "../components";
import { widthPercentageToDP, heightPercentageToDP } from "../../app/utils/responsive";
import { thunkLogginWithEmailAndPassword } from "../store/thunk";
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
interface BaseScreenProps {
    navigation: NavigationScreenProp<NavigationNavigateActionPayload>
}

interface DispatchInjectedProps {
    // loginWithEmailAndPassword: typeof loginWithEmailAndPassword;
    loginWithEmailAndPassword: typeof thunkLogginWithEmailAndPassword
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
        // firebase
        //     .auth()
        //     .signInWithEmailAndPassword(email, password)
        //     .then(() => this.props.navigation.navigate('App'))
        //     .catch(error => this.setState({ errorMessage: error.message }))

        // this.props.loginWithEmailAndPassword(email, password);
        this.props.loginWithEmailAndPassword(email, password);
    }

    render() {
        return (

            <SafeAreaView style={styles.styleSafeAreaView}>
                <View style={styles.container}>
                    <View style={styles.logo}>
                        <Text style={{ fontSize: 50 }}>LOGO</Text>
                    </View>
                    <View style={styles.labelPageContainer}>
                        <Text style={styles.labelPage}>Login</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <CustomTextInput
                            secureTextEntry={false}
                            label="Email"
                            placeHolder="Your email..."
                            iconName='email'
                            value={this.state.email}
                            setValueInput={(email: string) => this.setState({ email })}
                        />
                        <CustomTextInput
                            secureTextEntry={true}
                            label="Password"
                            placeHolder="Your password..."
                            iconName="vpn-key"
                            value={this.state.password}
                            setValueInput={(password: string) => this.setState({ password })}
                        />
                        <View style={styles.forgotButtonContainer}>
                            <TouchableOpacity style={styles.forgotButton}>
                                <Text style={styles.forgotButtonText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.loginButtonWraper}>
                        <TouchableOpacity
                            onPress={this.handleLogin}
                            style={styles.button}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomView}>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity>
                            <Text>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchInjectedProps => ({
    loginWithEmailAndPassword: bindActionCreators(thunkLogginWithEmailAndPassword, dispatch),
});

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
    logo: {
        height: heightPercentageToDP('15%'),
        width: "100%",
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center"
    },
    labelPageContainer: {
        height: heightPercentageToDP('5%'),
        width: "100%",
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    labelPage: {
        color: '#6558D7',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    formContainer: {
        height: heightPercentageToDP('50%'),
        width: "100%",
        padding: 15
    },
    linearGradient: {
        flex: 1,
        paddingHorizontal: 15,
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

    loginButtonContainer: {
        height: 50,
        width: widthPercentageToDP('50%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 20
    },
    loginButtonWraper: {
        height: heightPercentageToDP('15%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        backgroundColor: 'green'
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        color: '#ffffff',
        // margin: 10,
        opacity: 0.8
    },

    bottomView: {
        height: heightPercentageToDP('15%'),
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: 15
    }
})

export default connect(null, mapDispatchToProps)(SignInScreen);