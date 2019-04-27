import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { theme } from '../../app/constants';
type Props = {
    color?: any,
    style?: any,
    title?: any,
    _backFunc(): void
}
export default function Header(props: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonBack}
                onPress={props._backFunc}>
                <Text>Back</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text>{props.title}</Text>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        paddingRight: 60,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 13,
        elevation: 2,
    },
    buttonBack: {
        width: 60,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
});