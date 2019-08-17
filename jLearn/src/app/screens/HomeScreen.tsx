/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload, SafeAreaView } from "react-navigation";
import firebase from "react-native-firebase";
import { ContentCard, LevelDropBox } from "../components";
import { AppState } from "../../app/store";
import { thunkGetLevel } from "../store/system/thunk";
import { thunkGrammarFromFireBase } from '../../grammar/store/thunk';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from "react-redux";
import { GrammarsState } from '../../grammar/models/interface';


interface AppProps {
    currentLevel: string,
    grammars: GrammarsState
}
interface BaseScreenProps {
    navigation: NavigationScreenProp<NavigationNavigateActionPayload>
}


interface DispatchInjectedProps {
    getLevel: typeof thunkGetLevel,
    getGrammar: typeof thunkGrammarFromFireBase
}

interface StateInjectedProps {

}

interface HomeScreenProps extends DispatchInjectedProps, StateInjectedProps, BaseScreenProps, AppProps {

}

interface HomeScreenState {
    isLoading: boolean,
    bunpoList: any[],
    level: string,
}

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
    aref: any;
    unsubscribe: any;
    levels: any;
    constructor(props: HomeScreenProps) {
        super(props);
        this.aref = firebase.firestore().collection('bunpo_N3');
        this.unsubscribe = null;
        this.state = {
            isLoading: false,
            bunpoList: [],
            level: ''
        }
        this.signOut = this.signOut.bind(this);
        this._getLevel = this._getLevel.bind(this);
        this._getLevelFromLocal = this._getLevelFromLocal.bind(this);
        this.levels = [
            { value: 'N1' },
            { value: 'N2' },
            { value: 'N3' },
            { value: 'N4' },
            { value: 'N5' }
        ]
    }

    signOut = () => {
        firebase.auth().signOut().then((result) => {
            // console.log("RESULt LOGGOUT", result)
        }).catch(error => {
            // console.log("ERROR LOGOUT", error)
        })
    }

    _getLevelFromLocal = async () => {
        await this.props.getLevel('N3');
    }

    _getLevel = async (level: any) => {
        await this.setState({
            level
        });
        await this.props.getLevel(this.state.level);
        this.props.getGrammar(this.props.currentLevel);
    }

    async componentWillMount() {
        await this._getLevelFromLocal();
    }

    componentDidMount() {
        // console.log('---CURRENT-LEVEL---', this.props.currentLevel)

    }

    _getLength = (list: any): number => {
        return list && list.length;
    }
    render() {
        // console.log("AREF DID", this.aref)
        // console.log("---GRAMMARS---", this.props.grammars)
        return (
            <SafeAreaView style={styles.styleSafeAreaView}>
                <View style={styles.container}>
                    <View style={styles.topCard}>
                        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Hello, Dai!</Text>
                        <View style={styles.levelDropBox}>
                            <LevelDropBox
                                label={'Level'}
                                source={this.levels}
                                onChangeText={(level) => this._getLevel(level)}
                                value={this.state.level}
                            />
                        </View>
                    </View>

                    <ScrollView style={styles.contentContainer}>
                        <ContentCard
                            title='Grammar'
                            count={this._getLength(this.props.grammars)}
                            _onPressFunc={() => this._getLength(this.props.grammars) > 0 && this.props.navigation.navigate('GrammarScreen')}
                            color={'#ED5565'}
                        />
                        <ContentCard
                            title='Kanji'
                            _onPressFunc={() => { }}
                            color={'#FFCE54'}
                        />
                        <ContentCard
                            title='Vocabulary'
                            _onPressFunc={() => alert('Smooth')}
                            color='#48CFAD'
                        />
                        <ContentCard
                            title='Utilities'
                            _onPressFunc={() => alert('Smooth')}
                            color='#5D9CEC'
                        />
                    </ScrollView>
                </View>
            </SafeAreaView >
        );
    }
}
const mapStateToProps = (state: AppState) => ({
    currentLevel: state.system.level,
    grammars: state.grammar.grammars
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchInjectedProps => ({
    getLevel: bindActionCreators(thunkGetLevel, dispatch),
    getGrammar: bindActionCreators(thunkGrammarFromFireBase, dispatch)
});



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
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 1,
    },
    levelDropBox: {
        width: 100,
        height: 40,
        // backgroundColor: 'yellow'
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: 25,
        paddingTop: 20,
        backgroundColor: '#F5F7FA',
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);