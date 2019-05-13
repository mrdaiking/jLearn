/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { ContentCard } from "../components";
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
                    <View style={styles.topCard}>
                        <Text>Avatar Here</Text>
                    </View>
                    <ScrollView style={styles.contentContainer}>
                        <View style={styles.ratingCard}>
                            <Text>RATING</Text>
                        </View>
                        <ContentCard
                            title='文法'
                            _onPressFunc={() => this.props.navigation.navigate('GrammarScreen', { level: 'grammars_N3' })}
                        />
                        <ContentCard
                            title='漢字'
                            _onPressFunc={() => this.props.navigation.navigate('GrammarScreen', { level: 'grammars_N2' })}
                        />
                        <ContentCard
                            title='言葉'
                            _onPressFunc={() => alert('Smooth')}
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
        backgroundColor: "#f53b50"
    },
    ratingCard: {
        height: 100,
        width: "100%",
        backgroundColor: '#64EAA7',
        borderRadius: 10,
        marginVertical: 20
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#fdfcfc',
    }
})

export default connect(null, null)(HomeScreen);