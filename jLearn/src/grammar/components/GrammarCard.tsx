import * as React from "react";
import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Picker, TextInput } from "react-native";
import { theme } from "../../app/constants";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

type Props = {
    data?: any,
    _onDeleteFunc(): void
}

export default function GrammarCard(props: Props) {
    function renderVerbs() {
        return props.data.head.verbs.length !== 0 ?
            props.data.head.verbs.map((item: any) => {
                return <View style={{ backgroundColor: 'green', height: 20, borderRadius: 10, padding: 2, marginVertical: 2 }}>
                    <Text>{item.value}</Text>
                </View>
            })
            : null;

    }
    function renderNoun() {
        return props.data.head.noun ?
            <View style={{ backgroundColor: 'green', height: 20, borderRadius: 10, padding: 2, marginVertical: 2 }}>
                <Text>{props.data.head.noun}</Text>
            </View>
            : null;

    }
    function renderAdjs() {
        return props.data.head.adjs ?
            props.data.head.adjs.map((item: any) => {
                return
                <View style={{ backgroundColor: 'green', height: 20, borderRadius: 10, padding: 2, marginVertical: 2 }}>
                    <Text>{item.value}</Text>
                </View>
            }) : null;
    }
    function renderTails() {
        return props.data.tails ?
            props.data.tails.map((item: any) => {
                return <Text>{item.value}</Text>
            }) : null;
    }
    return (
        <View style={styles.card}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.headContainer}>
                        {renderVerbs()}
                        {renderNoun()}
                        {renderAdjs()}
                    </View>
                    <View style={styles.mainContainer}>
                        <Text>+</Text>
                        <Text style={{ fontWeight: 'bold' }}>{props.data.main}</Text>
                        <Text>+</Text>
                    </View>
                    <View style={styles.tailContainer}>

                        {renderTails()}
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontStyle: 'italic' }} numberOfLines={1}>{props.data.mean}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.groupButton}
                onPress={props._onDeleteFunc}
            >
                <IconMaterial
                    name='delete'
                    size={30}
                    color="#FFFFFF"
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        minHeight: 100,
        flexDirection: 'row',
        backgroundColor: '#00CED1',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        shadowColor: theme.colors.black,
        shadowOpacity: 0.11,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 13,
        borderRadius: 5

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
        flexDirection: 'row'
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