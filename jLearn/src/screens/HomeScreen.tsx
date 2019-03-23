/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
interface BaseScreenProps {

}

interface DispatchInjectedProps {

}

interface StateInjectedProps {

}

interface Props extends DispatchInjectedProps, StateInjectedProps, BaseScreenProps {

}

interface State {
    isLoading: boolean
}

class HomeScreen extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        const ref = firebase.firestore().collection('todos').doc('task');
        console.log("REF....", ref);
    }
    // conmponentDidMount() {

    //     // firebase
    //     //     .firestore()
    //     //     .runTransaction(async transaction => {
    //     //         const doc = await transaction.get(ref);

    //     //         // if it does not exist set the population to one
    //     //         if (!doc.exists) {
    //     //             transaction.set(ref, { population: 1 });
    //     //             // return the new value so we know what the new population is
    //     //             return 1;
    //     //         }

    //     //         // exists already so lets increment it + 1
    //     //         const newPopulation = doc.data().population + 1;

    //     //         transaction.update(ref, {
    //     //             population: newPopulation,
    //     //         });

    //     //         // return the new value so we know what the new population is
    //     //         return newPopulation;
    //     //     })
    //     //     .then(newPopulation => {
    //     //         console.log(
    //     //             `Transaction successfully committed and new population is '${newPopulation}'.`
    //     //         );
    //     //     })
    //     //     .catch(error => {
    //     //         console.log('Transaction failed: ', error);
    //     //     });
    // }
    render() {
        return (
            <SafeAreaView style={styles.styleSafeAreaView}>
                <View style={styles.container}>
                    <Text>Home Screen</Text>
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

export default connect(null, null)(HomeScreen);