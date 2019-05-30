import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base'

import { theme } from '../constants';
type Props = {
    color?: any,
    style?: any,
    title?: any,
    _backFunc(): void
}
export default function HeaderCustom(props: Props) {
    return (
        <Header style={styles.container}>
            <TouchableOpacity
                style={styles.buttonBack}
                onPress={props._backFunc}>
                <Text>Back</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text>{props.title}</Text>
            </View>
        </Header>
    )
}

export const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
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