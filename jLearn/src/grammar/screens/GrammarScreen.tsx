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
            isLoading: true,
            bunpoList: [],
            searchValue: ''
        }
        this._getGrammarsFromRedux = this._getGrammarsFromRedux.bind(this);
        this._renderItemList = this._renderItemList.bind(this);
        this._renderListBunpo = this._renderListBunpo.bind(this);
        this._moveToDetail = this._moveToDetail.bind(this);
        this._searchFilterData = this._searchFilterData.bind(this);
        this.signOut = this.signOut.bind(this);

    }

    async componentDidMount() {
        await this._getGrammarsFromRedux(this.props.grammars)
    }

    _getGrammarsFromRedux = async (bunpoList: any) => {
        await this.setState({
            bunpoList: bunpoList.grammars
        })
        await this.setState({
            isLoading: false
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

    componentWillUpdate() {

    }

    //Find item which have search value
    _findMainValue = (item: any, searchValue: string) => {
        if (searchValue == '')
            return true;
        if (item && item.mains[0]) {
            const meanValue = item.mains[0].value;
            const isExist = meanValue.search(searchValue);
            return isExist >= 0;
        }
        return false;
    }

    // Update new list bunpo after search
    _updateAfterSearched = async (newList: any) => {
        console.log('---UPDATE_LIST---', newList)
        await this.setState({
            bunpoList: newList
        })
    }

    //Handle search feature
    _searchFilterData = async (searchValue: string) => {
        console.log('---SEARCH_VALUVE---', searchValue)
        const grammarListFromRedux = this.props.grammars;
        let fillterList = grammarListFromRedux && grammarListFromRedux.grammars.filter((item: any) => this._findMainValue(item, searchValue));
        await this._updateAfterSearched(fillterList);
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

    _renderListBunpo = (bunpoList: any) => {
        console.log('---RENDER--BUNPO-LIST---', bunpoList)
        let newbunpoList = bunpoList && bunpoList.length !== 1 ? bunpoList.sort((first: any, second: any) => {
            return second.createTime - first.createTime
        }) : bunpoList;
        console.log('---SORTED BUNPO---', newbunpoList)
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

    _renderContent = (bunpoList: any) => {
        if (this.state.isLoading) {
            return <ActivityIndicator />;
        } else {
            return bunpoList.length == 0 ?
                <Text>No Data</Text> : this._renderListBunpo(bunpoList);
        }
    }

    render() {
        // console.log('---LISTGRAMMAR---', this.props.grammars)
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
                        {this._renderContent(this.state.bunpoList)}

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