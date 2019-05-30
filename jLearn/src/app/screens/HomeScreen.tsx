/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { ContentCard, LevelDropBox } from "../components";
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
    level: string
}

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
    aref: any;
    unsubscribe: any;
    levels: any;
    constructor(props: HomeScreenProps) {
        super(props);
        this.aref = firebase.firestore().collection('bunpo_N3');
        this.unsubscribe = null;
        this.state = {
            isLoading: false,
            bunpoList: [],
            level: ''
        }
        this.signOut = this.signOut.bind(this);
        this._getLevel = this._getLevel.bind(this);
        this.levels = [
            { value: 'N1' },
            { value: 'N2' },
            { value: 'N3' },
            { value: 'N4' },
            { value: 'N5' }
        ]
    }

    signOut = () => {
        firebase.auth().signOut().then((result) => {
            console.log("RESULt LOGGOUT", result)
        }).catch(error => {
            console.log("ERROR LOGOUT", error)
        })
    }

    _getLevel = (level: any) => {
        this.setState({
            level
        });
    }
    render() {
        console.log("AREF DID", this.aref)
        return (
            <SafeAreaView style={styles.styleSafeAreaView}>
                <View style={styles.container}>
                    <View style={styles.topCard}>
                        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Hello, Dai!</Text>
                        <View style={styles.levelDropBox}>
                            <LevelDropBox
                                label={'Level'}
                                source={this.levels}
                                onChangeText={(level) => this._getLevel(level)}
                                value={this.state.level}
                            />
                        </View>
                    </View>

                    <ScrollView style={styles.contentContainer}>
                        <ContentCard
                            title='Grammar'
                            _onPressFunc={() => this.props.navigation.navigate('GrammarScreen', { level: 'grammars_N3' })}
                            color={'#ED5565'}
                        />
                        <ContentCard
                            title='Kanji'
                            _onPressFunc={() => this.props.navigation.navigate('GrammarScreen', { level: 'grammars_N2' })}
                            color={'#FFCE54'}
                        />
                        <ContentCard
                            title='Vocabulary'
                            _onPressFunc={() => alert('Smooth')}
                            color='#48CFAD'
                        />
                        <ContentCard
                            title='Utilities'
                            _onPressFunc={() => alert('Smooth')}
                            color='#5D9CEC'
                        />
                    </ScrollView>
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
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fdfcfc"
    },
    topCard: {
        height: 100,
        width: '100%',
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 1,
    },
    levelDropBox: {
        width: 100,
        height: 40,
        // backgroundColor: 'yellow'
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: 25,
        paddingTop: 20,
        backgroundColor: '#F5F7FA',
    }
})

export default connect(null, null)(HomeScreen);