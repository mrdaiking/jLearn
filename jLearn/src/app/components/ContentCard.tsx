import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TouchableHighlight } from 'react-native';

type Props = {
    icon?: any,
    iconText?: any,
    _onPressFunc(): any,
    title?: string,
    color?: any,
    count?: number
}

export default function ContentCard(props: Props) {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: props.color }]}
            onPress={props._onPressFunc}
        >
            <View style={styles.titleStyle}>
                <Text style={styles.textStyle}>{props.title}</Text>
                <Text>{props.count}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 120,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#ED5665',
        paddingVertical: 10,
        shadowColor: '#E7A07F',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 13,
        elevation: 2,
        marginVertical: 5,
        borderRadius: 10,
        marginBottom: 20
    },
    titleStyle: {
        borderRadius: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 15

    },
    textStyle: {
        fontFamily: 'Helvetica',
        fontSize: 25,
        fontWeight: 'bold',
        color: "#FFFFFF",
        marginBottom: 5

    }
})
