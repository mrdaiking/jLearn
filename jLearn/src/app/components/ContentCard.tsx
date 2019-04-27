import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TouchableHighlight } from 'react-native';

type Props = {
    icon?: any,
    iconText?: any,
    _onPressFunc(): any,
    title?: string
}

export default function ContentCard(props: Props) {
    return (
        <TouchableOpacity style={styles.container}
            onPress={props._onPressFunc}
        >
            <View style={styles.titleStyle}>
                <Text style={styles.textStyle}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FC4C82',
        paddingVertical: 10,
        shadowColor: '#FC4C82',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 13,
        elevation: 2,
        marginVertical: 5,
        borderRadius: 10
    },
    titleStyle: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textStyle: {
        fontFamily: 'Helvetica',
        fontSize: 25,
        fontWeight: 'bold'

    }
})
