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
import { GrammarCard, AccordionCustomHeaderContent } from "../components";
import { HeaderCustom } from "../../app/components";
import { GrammarModel } from "../models/interface";
import { deleteGrammar } from "../api";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Content, Accordion } from "native-base";

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

interface GrammarDetailScreenProps extends DispatchInjectedProps, StateInjectedProps, BaseScreenProps, AppProps {

}

interface GrammarDetailScreenState {
    isLoading: boolean,
    bunpoList: any,
    bunpoDetail: any
}

class GrammarDetailScreen extends React.Component<GrammarDetailScreenProps, GrammarDetailScreenState> {
    constructor(props: GrammarDetailScreenProps) {
        super(props);
        this.state = {
            isLoading: false,
            bunpoList: [],
            bunpoDetail: null
        }

    }

    async componentDidMount() {
        let bunpoTrans: any = this.props.navigation.getParam('grammarData');
        console.log('--GRAMMAR DETAIL--', bunpoTrans);
        await this.setState({
            bunpoDetail: bunpoTrans
        })
        console.log('--GRAMMAR DETAIL--STATE---', this.state.bunpoDetail);
    }

    render() {
        return (
            <SafeAreaView style={styles.styleSafeAreaView}>
                <View style={styles.container}>
                    <HeaderCustom
                        title='Grammar Detail'
                        _backFunc={() => this.props.navigation.goBack(null)}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={{ justifyContent: "center", alignItems: 'center', width: '100%', height: 200 }}>
                            {this.state.bunpoDetail && <GrammarCard
                                isCard={false}
                                data={this.state.bunpoDetail.item || null}
                                key={this.state.bunpoDetail.index}
                                index={this.state.bunpoDetail.index}
                                _onDeleteFunc={() => { }}
                                _onTouch={() => { }}

                            />}
                        </View>
                        <View>
                            <Text>{this.state.bunpoDetail && this.state.bunpoDetail.item.mean}</Text>
                        </View>
                        <View style={{ width: '100%' }}>
                            <AccordionCustomHeaderContent
                                examples={this.state.bunpoDetail && this.state.bunpoDetail.item.examples}
                            />
                        </View>
                    </View>
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
        // justifyContent: 'center',
        // alignItems: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(GrammarDetailScreen);