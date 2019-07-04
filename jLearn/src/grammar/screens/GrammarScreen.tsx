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
import { HeaderCustom } from "../../app/components";
import { GrammarModel } from "../models/interface";
import { deleteGrammar } from "../api";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { SearchBar } from 'react-native-elements';

interface AppProps {
    grammars: GrammarsState,
    currentLevel: string
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
    searchValue: string,
}

class GrammarScreen extends React.Component<GrammarScreenProps, GrammarcreenState> {
    constructor(props: GrammarScreenProps) {
        super(props);
        this.state = {
            isLoading: false,
            bunpoList: [],
            searchValue: ''
        }
        this.signOut = this.signOut.bind(this);
        this._renderItemList = this._renderItemList.bind(this);
        this._renderListBunpo = this._renderListBunpo.bind(this);
        this._moveToDetail = this._moveToDetail.bind(this);
        this._searchFilterData = this._searchFilterData.bind(this);
    }

    async componentDidMount() {
        await this.setState({
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
            // console.log("RESULt LOGGOUT", result)
        }).catch(error => {
            // console.log("ERROR LOGOUT", error)
        })
    }

    updateDocument = () => {

    }

    _deleteDocument = async (id: any) => {
        await deleteGrammar(id, this.props.currentLevel);
        this.props.getGrammars(this.props.currentLevel);
    }

    _moveToDetail = (grammarData: any) => {
        this.props.navigation.navigate('GrammarDetailScreen', { grammarData })
    }

    _renderItemList = (grammar: any, index: any) => {
        // console.log("CONSOLE", grammar)
        return (
            <GrammarCard
                isCard={true}
                data={grammar.item}
                key={grammar.index}
                index={index}
                _onDeleteFunc={() => this._deleteDocument(grammar.item.id)}
                _onTouch={() => this._moveToDetail(grammar)}

            />
        )
    }

    async _onRefresh() {
        this.setState({
            isLoading: true
        })
        await this.props.getGrammars(this.props.currentLevel);
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 5000)

    }

    _renderListBunpo = (bunpoList: any) => {
        console.log('---LIST BUNPO---', bunpoList)
        this._searchFilterData(this.state.searchValue);
        // console.log('---SEARCH_VALUVE---', bunpoList)
        let newbunpoList = bunpoList.grammars.sort((first: any, second: any) => {
            return second.createTime - first.createTime;
        })
        // console.log('---SORTED BUNPO---', newbunpoList)
        return (
            <FlatList
                horizontal={false}
                style={{ backgroundColor: 'transparent' }}
                data={newbunpoList}
                initialScrollIndex={0}
                refreshing={this.state.isLoading}
                keyExtractor={(item: any, index: number) => item.index}
                renderItem={(item) => this._renderItemList(item, item.index)}
                onRefresh={() => this._onRefresh()}
            />
        )
    }

    componentWillUpdate() {
    }

    _findMainValue = (item: any, searchValue: string) => {
        const a = '塩';
        const b = 'しお';
        console.log('---MAIN-VALUE---');
        //const result = item.mains.filter((element: any) => wanakana.toRomaji(element.value) === wanakana.toRomaji(searchValue.toString()));
        // console.log('---MAIN-VALUE--RESULT--', result)

        return true;
    }




    _searchFilterData = (searchValue: string) => {
        console.log('---SEARCH_VALUVE---', searchValue)
        let fillteredGrammars = this.state.bunpoList && this.state.bunpoList.grammars.filter((item: any) => this._findMainValue(item, searchValue));
        let contentFiltered = fillteredGrammars.fillter
        console.log('---FILLTERDATA---', fillteredGrammars)


    }
    render() {
        // console.log('---THE PROPS---', this.props.grammars)
        // console.log('---THE CUURRENT--LEVEL---', this.props.currentLevel)
        return (
            <SafeAreaView style={styles.styleSafeAreaView}>
                <View style={styles.container}>
                    <HeaderCustom
                        title='Grammar Screen'
                        _backFunc={() => this.props.navigation.goBack(null)}
                    />
                    <SearchBar
                        containerStyle={{ width: '100%' }}
                        placeholder="Type Here..."
                        onChangeText={(searchValue) => {
                            this.setState({ searchValue });
                            this._searchFilterData(searchValue);
                        }}
                        value={this.state.searchValue}
                        lightTheme={true}
                    />
                    <View style={styles.content}>
                        {this.state.bunpoList && this.state.bunpoList.length !== 0 ? this._renderListBunpo(this.state.bunpoList) : <ActivityIndicator />}

                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddingGrammarScreen', { currentLevel: this.props.currentLevel })}
                        style={styles.addNewGrammarBtn}
                    >
                        <IconMaterial
                            name='add'
                            size={30}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        );
    }
}
const mapStateToProps = (state: AppState) => ({
    grammars: state.grammar,
    currentLevel: state.system.level
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
        backgroundColor: "#F6F6F6",
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
    },
    grammarCard: {

    },
    addNewGrammarBtn: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#2E8B57',
        bottom: 15,
        right: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(GrammarScreen);