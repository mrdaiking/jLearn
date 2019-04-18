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
        this.aref = firebase.firestore().collection('bunko_N3');
        this.unsubscribe = null;
        this.state = {
            isLoading: false,
            bunpoList: []
        }
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
        console.log('DOCUMENT', querySnapshot);
        querySnapshot.forEach((doc: any) => {
            console.log('DOC', doc.data().id);
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

    getData() {
        firebase
            .firestore()
            .runTransaction(async transaction => {
                const doc = await transaction.get(this.aref);
                console.log('---UPDATE--INDEX--', doc)
                // if it does not exist set the population to one
                // if (!doc.exists) {
                //     transaction.set(ref, { population: 1 });
                //     // return the new value so we know what the new population is
                //     return 1;
                // }

                // // exists already so lets increment it + 1
                // const newPopulation = doc.data().population + 1;

                // transaction.update(ref, {
                //     population: newPopulation,
                // });

                // // return the new value so we know what the new population is
                // return newPopulation;
            })
            .then(newPopulation => {
                console.log(
                    `Transaction successfully committed and new population is`
                );
            })
            .catch(error => {
                console.log('Transaction failed: ', error);
            });
    }
    updateDocument = () => {

    }

    render() {
        console.log('---THE PROPS---', this.props)
        return (
            <SafeAreaView style={styles.styleSafeAreaView}>
                <View style={styles.container}>
                    <Text>Grammar Screen</Text>
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