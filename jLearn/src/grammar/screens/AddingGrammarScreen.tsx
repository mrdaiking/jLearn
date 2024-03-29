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
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { thunkGrammarFromFireBase } from "../store/thunk";
import moment from "moment";
import { HeaderCustom } from "../../app/components";
import { Button } from 'react-native-elements';
// import console = require("console");
interface BaseScreenProps {
    navigation: NavigationScreenProp<NavigationNavigateActionPayload>
}

interface DispatchInjectedProps {
    getGrammars: typeof thunkGrammarFromFireBase
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
    mains: any[],
    examples: any[],
    usage: string,
    image: any,
    category: any
}

class AddingGrammarScreen extends React.Component<AddingGrammarScreenProps, GrammarcreenState> {
    aref: any;
    unsubscribe: any;
    constructor(props: AddingGrammarScreenProps) {
        super(props);
        this.aref = firebase.firestore().collection(this.props.navigation.getParam('currentLevel'));
        this.unsubscribe = null;
        this.state = {
            isLoading: false,
            bunpoList: [],
            verbs: [],
            tails: [],
            adjs: [],
            noun: '',
            mean: '',
            mains: [],
            examples: [],
            usage: '',
            image: '',
            category: ''
        }
        this.addDocument = this.addDocument.bind(this);
        this.signOut = this.signOut.bind(this);
        this.renderItemList = this.renderItemList.bind(this);
        this.renderList = this.renderList.bind(this);
        this.addVerbs = this.addVerbs.bind(this);
        this.renderLastItem = this.renderLastItem.bind(this);
        this.getSource = this.getSource.bind(this);
    }

    componentWillMount() {
    }

    signOut = () => {
        firebase.auth().signOut().then((result) => {
            // console.log("RESULt LOGGOUT", result)
        }).catch(error => {
            // console.log("ERROR LOGOUT", error)
        })
    }
    updateDocument = () => {

    }

    updateValue = (value: any) => {
        let index = this.state.verbs.findIndex((item) => item.nameType == value.nameType)
        // console.log('---UPDATE--INDEX--', index)

    }

    _onDelelte = (type: any, id: any) => {

        // const filteredData = this.getSource(type).filter(item => item.id !== id);
        const filteredData = this.getSource(type).filter((item: any, index: number) => index !== id);
        // const filteredData = this.getSource(type);
        switch (type) {
            case 'V':
                this.setState({
                    verbs: filteredData
                })
                break;
            case 'A':
                this.setState({
                    adjs: filteredData
                })
                break;
            case 'TAIL':
                this.setState({
                    tails: filteredData
                })
                break;
            case 'M':
                this.setState({
                    mains: filteredData
                })
                break;
            case 'E':
                this.setState({
                    examples: filteredData
                })
                break;
            default:
                break;
        }
    }



    addValue = async (value: any, type: any) => {
        switch (type) {
            case 'V':
                this.setState({
                    verbs: [...this.state.verbs, value]
                })
                break;
            case 'A':
                this.setState({
                    adjs: [...this.state.adjs, value]
                })
                break;
            case 'TAIL':
                this.setState({
                    tails: [...this.state.tails, value]
                })
                break;
            case 'M':
                this.setState({
                    mains: [...this.state.mains, value]
                })
                break;
            case 'E':
                this.setState({
                    examples: [...this.state.examples, value]
                })
                break;
            default:
                break;
        }
    }

    renderItemList = (verb: any) => {
        // console.log('---Render Item--', verb)
        return (
            <ItemCard
                type={''}
                nameType={verb ? verb.item.nameType : ''}
                value={verb ? verb.item.value : ''}
                _clearFunc={() => this._onDelelte(verb.item.cate, verb.index)}
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
        switch (type) {
            case 'V':
                return this.state.verbs
                break;
            case 'A':
                return this.state.adjs
                break;
            case 'TAIL':
                return this.state.tails
                break;
            case 'M':
                return this.state.mains
                break;
            case 'E':
                return this.state.examples
                break;
            default:
                return [];
                break;
        }
    }

    renderList = (type: string) => {
        // console.log('---TYPe---', type)
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
        let { verbs, adjs, noun, mains, mean, tails, category, image, examples, usage } = this.state;
        let dataSending = {
            createTime: moment().valueOf(),
            head: {
                verbs,
                adjs,
                noun
            },
            mains,
            mean,
            tails,
            category,
            image,
            examples,
            usage
        }
        // console.log('---SENDING DATA---', dataSending)
        this.aref.add(dataSending);
    }

    onSubmit = async () => {
        const currentLevel = this.props.navigation.getParam('currentLevel');
        console.log('---Render CURRENT-SUB--', currentLevel)
        await this.addDocument();
        this.props.getGrammars(currentLevel);
        this.props.navigation.goBack(null);
    }

    addVerbs = () => {

    }

    addTails = () => {

    }

    render() {
        // console.log('---THE PROPS---', this.props)
        return (
            <SafeAreaView style={styles.styleSafeAreaView}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <HeaderCustom
                        title='Adding Screen'
                        _backFunc={() => this.props.navigation.goBack(null)}
                    />
                    <ScrollView style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 10 }}>
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
                        {
                            this.renderList('M')
                        }
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
                        {
                            this.renderList('E')
                        }

                    </ScrollView>
                    <View style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            onPress={() => this.onSubmit()}
                            style={{ width: 200 }}
                            title="ADD"
                        />
                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView >
        );
    }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchInjectedProps => ({
    getGrammars: bindActionCreators(thunkGrammarFromFireBase, dispatch),
});
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

export default connect(null, mapDispatchToProps)(AddingGrammarScreen);