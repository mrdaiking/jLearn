/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
interface BaseScreenProps {
    navigation: NavigationScreenProp<NavigationNavigateActionPayload>
}

interface DispatchInjectedProps {

}

interface StateInjectedProps {

}

interface GrammarScreenProps extends DispatchInjectedProps, StateInjectedProps, BaseScreenProps {

}

interface GrammarcreenState {
    isLoading: boolean,
    bunpoList: any[],
}

class GrammarScreen extends React.Component<GrammarScreenProps, GrammarcreenState> {
    aref: any;
    unsubscribe: any;
    constructor(props: GrammarScreenProps) {
        super(props);
        this.aref = firebase.firestore().collection('bunpo_N3');
        this.unsubscribe = null;
        this.state = {
            isLoading: false,
            bunpoList: []
        }
        this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
        this.addDocument = this.addDocument.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentWillMount() {
        console.log("AREF WILL", this.aref)
    }

    componentDidMount() {
        console.log("AREF DID", this.aref);
        this.unsubscribe = this.aref.onSnapshot(this.onCollectionUpdate);
        console.log("UNSUBSCRIBE", this.unsubscribe)
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    signOut = () => {
        firebase.auth().signOut().then((result) => {
            console.log("RESULt LOGGOUT", result)
        }).catch(error => {
            console.log("ERROR LOGOUT", error)
        })
    }
    onCollectionUpdate = (querySnapshot: any) => {
        const bunpoList = [];
        querySnapshot.forEach((doc: any) => {
            console.log('DOC', doc.data());
            // doc.ref.update({ userName: 'hihi' })
            // const { title, complete } = doc.data();
            // todos.push({
            //     key: doc.id,
            //     doc, // DocumentSnapshot
            //     title,
            //     complete,
            // });
        });
        // this.setState({
        //     todos,
        //     loading: false,
        // });
    }
    updateDocument = () => {

    }

    addDocument = () => {
        this.aref.add({
            head: {
                verbs: {
                    masu: true,
                    te: false
                }
            },
            main: "ように",
            tail: ["しない", "する"]
        })
    }

    render() {
        console.log('---THE PROPS---', this.props)
        return (
            <SafeAreaView style={styles.styleSafeAreaView}>
                <View style={styles.container}>
                    <Text>Grammar Screen</Text>
                    <TouchableOpacity
                        onPress={() => this.addDocument()}
                    >
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddingGrammarScreen')}
                    >
                        <Text>ADD NEW GRAMMAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack(null)}
                    >
                        <Text>BACK</Text>
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

export default connect(null, null)(GrammarScreen);