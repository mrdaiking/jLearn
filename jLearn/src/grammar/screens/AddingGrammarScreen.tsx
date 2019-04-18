/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Dimensions, Text, FlatList, ScrollView } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { AddingComponent, ItemCard } from "../components";
import { Block, Card } from "../../app/components";
import { theme } from "../../app/constants";
const { width } = Dimensions.get('window');
// import console = require("console");
interface BaseScreenProps {
    navigation: NavigationScreenProp<NavigationNavigateActionPayload>
}

interface DispatchInjectedProps {

}

interface StateInjectedProps {

}

interface AddingGrammarScreenProps extends DispatchInjectedProps, StateInjectedProps, BaseScreenProps {

}

interface GrammarcreenState {
    isLoading: boolean,
    bunpoList: any[],
    verbs: any[],
    tails: any[],
    adjs: any[],
    noun: string,
    mean: string,
    main: string
}

class AddingGrammarScreen extends React.Component<AddingGrammarScreenProps, GrammarcreenState> {
    aref: any;
    unsubscribe: any;
    constructor(props: AddingGrammarScreenProps) {
        super(props);
        this.aref = firebase.firestore().collection('bunko_N3');
        this.unsubscribe = null;
        this.state = {
            isLoading: false,
            bunpoList: [],
            verbs: [],
            tails: [],
            adjs: [],
            noun: '',
            mean: '',
            main: ''
        }
        this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
        this.addDocument = this.addDocument.bind(this);
        this.signOut = this.signOut.bind(this);
        this.renderItemList = this.renderItemList.bind(this);
        this.renderList = this.renderList.bind(this);
        this.addVerbs = this.addVerbs.bind(this);
        this.renderLastItem = this.renderLastItem.bind(this);
        this.getSource = this.getSource.bind(this);
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

    updateValue = (value: any) => {
        let index = this.state.verbs.findIndex((item) => item.nameType == value.nameType)
        console.log('---UPDATE--INDEX--', index)

    }



    addValue = async (value: any, type: any) => {
        if (type == 'V') {
            this.setState({
                verbs: [...this.state.verbs, value]
            })
        } else if (type == 'A') {
            this.setState({
                adjs: [...this.state.adjs, value]
            })
        } else {
            this.setState({
                tails: [...this.state.tails, value]
            })
        }
    }

    renderItemList = (verb: any) => {
        console.log('---Render Item--', verb)
        return (
            <ItemCard
                type={''}
                nameType={verb ? verb.item.nameType : ''}
                value={verb ? verb.item.value : ''}
            />
        )
    }
    renderLastItem = (type: string) => {
        return (
            <AddingComponent
                type={type}
                addValue={(value) => this.addValue(value, type)}
                isLast={true}
                addPlus={() => { }}
                exportValue={() => { }}
            />
        )
    }

    getSource = (type: string) => {
        if (type == 'V') {
            return this.state.verbs
        } else if (type == 'A') {
            return this.state.adjs
        } else {
            return this.state.tails
        }
    }

    renderList = (type: string) => {
        return (
            <FlatList
                style={{ backgroundColor: 'transparent' }}
                data={this.getSource(type)}
                initialScrollIndex={0}
                keyExtractor={(item: any, index: number) => index.toString()}
                renderItem={this.renderItemList}
                ListHeaderComponent={this.renderLastItem(type)}
            />
        )
    }

    addDocument = () => {
        let dataSending = {
            head: {
                verbs: this.state.verbs,
                adjs: this.state.adjs,
                noun: this.state.noun
            },
            main: this.state.main,
            mean: this.state.mean,
            tails: this.state.tails
        }
        console.log('---SENDING DATA---', dataSending)
        this.aref.add(dataSending);
    }

    onSubmit = async () => {
        await this.addDocument();
        this.props.navigation.goBack(null);
    }

    addVerbs = () => {

    }

    addTails = () => {

    }

    render() {
        console.log('---THE PROPS---', this.props)
        return (
            <SafeAreaView style={styles.styleSafeAreaView}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack(null)}
                        style={{ width: '100%', height: 20, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text>BACK</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        <Block padding={[0, theme.sizes.base * 2]}>

                            {
                                this.renderList('V')
                            }
                            <View style={{ height: 80 }}>
                                <AddingComponent
                                    type='N'
                                    addValue={(value) => this.addValue(value, 'N')}
                                    exportValue={(value) => { this.setState({ noun: value }) }}
                                />
                            </View>
                            {
                                this.renderList('A')
                            }
                            <View style={{ height: 80 }}>
                                <AddingComponent
                                    type='M'
                                    addValue={(value) => this.addValue(value, 'M')}
                                    exportValue={(value) => { this.setState({ main: value }) }}
                                />
                            </View>
                            <View style={{ height: 80 }}>
                                <AddingComponent
                                    type='ME'
                                    addValue={(value) => this.addValue(value, 'ME')}
                                    exportValue={(value) => { this.setState({ mean: value }) }}
                                />
                            </View>
                            {
                                this.renderList('TAIL')
                            }

                        </Block>

                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => this.onSubmit()}
                        style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FC3D39' }}
                    >
                        <Text>SUBMIT</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    styleSafeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    lastItemContainer: {

        borderRadius: 6,
        padding: 5,
    },
    buttonAddVerbs: {
        backgroundColor: 'green'
    },
    category: {
        // this should be dynamic based on screen width
        minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
        maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
        maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
        backgroundColor: 'green'
    },
    card: {
        borderRadius: theme.sizes.border,
        padding: theme.sizes.base + 4,
        marginBottom: theme.sizes.base,
    },
    shadow: {
        shadowColor: theme.colors.black,
        shadowOpacity: 0.11,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 13,
    }
})

export default connect(null, null)(AddingGrammarScreen);