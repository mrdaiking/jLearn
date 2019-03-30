/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload, SafeAreaView, } from "react-navigation";
import { connect } from "react-redux";
import { CustomTextInput } from "../components";
import { widthPercentageToDP, heightPercentageToDP } from "../../app/utils/responsive";
import { thunkLogginWithEmailAndPassword, thunkCheckLoggedIn } from "../store/thunk";
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from "../../app/store";
interface BaseScreenProps {
    navigation: NavigationScreenProp<NavigationNavigateActionPayload>
}

interface DispatchInjectedProps {
    loginWithEmailAndPassword: typeof thunkLogginWithEmailAndPassword,
    checkLoggedIn: typeof thunkCheckLoggedIn
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

    handleLogin = async () => {
        const { email, password } = this.state
        await this.props.loginWithEmailAndPassword(email, password);
        this.props.navigation.navigate('App');
    }

    render() {
        return (
            <SafeAreaView style={styles.styleSafeAreaView}>
                <View style={styles.container}>
                    <View style={styles.logo}>
                        <Image
                            source={require('../assets/logo/logo.png')}
                        />
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
                            style={styles.loginButtonContainer}
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
const mapStateToProps = (state: AppState) => ({
    authentication: state.session,
});
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchInjectedProps => ({
    loginWithEmailAndPassword: bindActionCreators(thunkLogginWithEmailAndPassword, dispatch),
    checkLoggedIn: bindActionCreators(thunkCheckLoggedIn, dispatch)
});

const styles = StyleSheet.create({
    styleSafeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF"
    },
    logo: {
        height: heightPercentageToDP('15%'),
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    formContainer: {
        width: "100%",
        padding: 15,
    },
    forgotButtonContainer: {
        width: "100%",
        alignItems: 'flex-end'
    },
    forgotButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotButtonText: {
        color: '#1F2041'
    },

    loginButtonContainer: {
        height: 50,
        width: widthPercentageToDP('50%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#FC1A1C'
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 20
    },
    loginButtonWraper: {
        height: heightPercentageToDP('15%'),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    button: {
        width: '100%',
        // backgroundColor: 'green'
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
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 10
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: 15
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);