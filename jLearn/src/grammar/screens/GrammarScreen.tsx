/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { AppState } from "../../app/store";
import { GrammarsState } from "../models/interface";
import { thunkGrammarFromFireBase } from "../store/thunk";
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GrammarCard } from "../components";
import { Header } from "../../app/components";
import { GrammarModel } from "../models/interface";
import { deleteGrammar } from "../api";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
interface AppProps {
    grammars: GrammarsState
}
interface BaseScreenProps {
    navigation: NavigationScreenProp<NavigationNavigateActionPayload>
}

interface DispatchInjectedProps {
    getGrammars: typeof thunkGrammarFromFireBase
}

interface StateInjectedProps {

}

interface GrammarScreenProps extends DispatchInjectedProps, StateInjectedProps, BaseScreenProps, AppProps {

}

interface GrammarcreenState {
    isLoading: boolean,
    bunpoList: any,
}

class GrammarScreen extends React.Component<GrammarScreenProps, GrammarcreenState> {
    constructor(props: GrammarScreenProps) {
        super(props);
        this.state = {
            isLoading: false,
            bunpoList: []
        }
        this.signOut = this.signOut.bind(this);
        this.renderItemList = this.renderItemList.bind(this);
        this.renderListBunpo = this.renderListBunpo.bind(this);
    }

    async componentDidMount() {
        await this.props.getGrammars('grammars_N3');
        this.setState({
            bunpoList: this.props.grammars
        })

    }

    // shouldComponentUpdate(nextProps: any, nextState: any) {
    //     console.log("UNSUBSCRIBE", nextProps.grammars.grammars)
    //     return this.props.grammars.grammars !== nextProps.grammars.grammars
    //         || this.state.bunpoList !== nextState.bunpoList
    // }

    signOut = () => {
        firebase.auth().signOut().then((result) => {
            console.log("RESULt LOGGOUT", result)
        }).catch(error => {
            console.log("ERROR LOGOUT", error)
        })
    }

    updateDocument = () => {

    }

    _deleteDocument = async (id: any) => {
        await deleteGrammar(id);
        this.props.getGrammars('grammars_N3');
    }

    renderItemList = (grammar: any) => {
        console.log("CONSOLE", grammar)
        return (
            <GrammarCard
                data={grammar.item}
                key={grammar.index}
                _onDeleteFunc={() => this._deleteDocument(grammar.item.id)}
            />
        )
    }

    async _onRefresh() {
        this.setState({
            isLoading: true
        })
        await this.props.getGrammars('grammars_N3');
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 5000)

    }

    renderListBunpo = (bunpoList: any) => {
        console.log('---LIST BUNPO---', this.state.bunpoList.grammars)
        let newbunpoList = bunpoList.sort((first: any, second: any) => {
            return second.createTime - first.createTime;
        })
        console.log('---SORTED BUNPO---', newbunpoList)
        return (
            <FlatList
                horizontal={false}
                style={{ backgroundColor: 'transparent' }}
                data={newbunpoList}
                initialScrollIndex={0}
                refreshing={this.state.isLoading}
                keyExtractor={(item: any, index: number) => index.toString()}
                renderItem={this.renderItemList}
                onRefresh={() => this._onRefresh()}
            />
        )
    }



    render() {
        console.log('---THE PROPS---', this.props.grammars)
        return (
            <SafeAreaView style={styles.styleSafeAreaView}>
                <View style={styles.container}>
                    <Header
                        title='Grammar Screen'
                        _backFunc={() => this.props.navigation.goBack(null)}
                    />
                    <View style={styles.content}>
                        {this.props.grammars.grammars.length !== 0 ? this.renderListBunpo(this.props.grammars.grammars) : <ActivityIndicator />}

                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddingGrammarScreen')}
                        style={styles.addNewGrammarBtn}
                    >
                        <IconMaterial
                            name='add'
                            size={40}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        );
    }
}
const mapStateToProps = (state: AppState) => ({
    grammars: state.grammar
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchInjectedProps => ({
    getGrammars: bindActionCreators(thunkGrammarFromFireBase, dispatch),
});

const styles = StyleSheet.create({
    styleSafeAreaView: {
        flex: 1,
    },
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F8F8F8",
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
    },
    grammarCard: {

    },
    addNewGrammarBtn: {
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#2E8B57',
        bottom: 15,
        right: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(GrammarScreen);