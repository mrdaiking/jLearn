import * as React from "react";
import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Picker, TextInput } from "react-native";
import { theme } from "../../app/constants";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

type Props = {
    isCard: boolean
    data?: any,
    index?: any,
    _onDeleteFunc(): void,
    _onTouch(): void
}

export default function GrammarCard(props: Props) {
    function _renderBagde(isCard: boolean, value: any, backgroundColor: string) {
        return isCard ?
            <View style={{ backgroundColor: backgroundColor, height: 20, borderRadius: 10, padding: 2, marginVertical: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 13 }}> {value}</Text>
            </View>
            :
            <View style={{ backgroundColor: backgroundColor, height: 30, borderRadius: 15, padding: 2, marginVertical: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>{value}</Text>
            </View>
    }
    function renderVerbs() {
        return props.data.head.verbs.length !== 0 ?
            props.data.head.verbs.map((item: any) => {
                return _renderBagde(props.isCard, item.value, '#FED958');
            })
            : null;
    }
    function renderNoun() {
        return props.data.head.noun ?
            _renderBagde(props.isCard, props.data.head.noun, '#FC3D39')
            : null;

    }
    function renderAdjs() {
        return props.data.head.adjs ?
            props.data.head.adjs.map((item: any) => {
                return _renderBagde(props.isCard, item.value, '#2ED5FA')
            }) : null;
    }
    function renderTails() {
        return props.data.tails && props.data.tails.length !== 0 ?
            <View style={styles.tailContainer}>
                {
                    props.data.tails.map((tail: any) => {
                        return (
                            <Text style={{ fontSize: props.isCard ? 13 : 20 }}>{tail.value}</Text>
                        )
                    })
                }
            </View>
            : null;
    }
    function renderMain() {
        return props.data.mains ?
            <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'row' }}>
                <IconMaterial
                    name='add'
                    size={10}
                    color="#000000"
                />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    {props.data.mains.map((item: any) => {
                        return props.isCard ?
                            <Text style={{ fontWeight: 'bold' }}>{item.value}</Text>
                            :
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.value}</Text>
                    })}
                </View>
                {
                    props.data.tails && props.data.tails.length !== 0 ? <IconMaterial
                        name='add'
                        size={10}
                        color="#000000"
                    /> : null
                }

            </View>
            : null;
    }

    function _renderContent(isCard: boolean) {
        return isCard ?
            <TouchableOpacity
                style={styles.card}
                onPress={props._onTouch}
                key={props.index}
            >

                <View>
                    <Text style={{ color: 'red' }}>{props.index + 1}</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.headContainer}>
                            {renderVerbs()}
                            {renderNoun()}
                            {renderAdjs()}
                        </View>
                        <View style={styles.mainContainer}>
                            {renderMain()}
                        </View>
                        {
                            renderTails()
                        }

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontStyle: 'italic' }} numberOfLines={1}>{props.data.mean}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.groupButton}
                    onPress={props._onDeleteFunc}
                >
                    <IconMaterial
                        name='delete'
                        size={25}
                        color="#000000"
                    />
                </TouchableOpacity>
            </TouchableOpacity>
            :
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.headContainer}>
                    {renderVerbs()}
                    {renderNoun()}
                    {renderAdjs()}
                </View>
                <View style={styles.mainContainer}>
                    {renderMain()}
                </View>
                {
                    renderTails()
                }

            </View>
        {/* <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ fontStyle: 'italic' }} numberOfLines={1}>{props.data.mean}</Text>
                </View> */}
    }

    return (
        _renderContent(props.isCard)
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        minHeight: 100,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        shadowColor: theme.colors.black,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        borderRadius: 5,
        elevation: 2

    },
    headContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    verbList: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tailContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    groupButton: {
        width: 60,
        alignItems: 'flex-end'
    }
})