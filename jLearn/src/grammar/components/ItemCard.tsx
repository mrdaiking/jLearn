import * as React from "react";
import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Picker, TextInput } from "react-native";
import { theme } from "../../app/constants";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

interface Props {
    type?: string,
    nameType: string,
    value: string,
    _clearFunc(): void
}

export default function ItemCard(props: Props) {
    function getColor(type: any) {
        switch (type) {
            case 'V':
                return theme.colors.verb;
                break;
            case 'N':
                return theme.colors.noun;
                break;
            case 'A':
                return theme.colors.adj;
                break;
            default:
                return theme.colors.verb;
                break;
        }
    }
    return (
        <View style={[styles.card, { backgroundColor: getColor(props.type) }]}>
            <View style={styles.type}>
                <Text style={{ color: 'black' }}>
                    {`${props.nameType}`}
                </Text>
            </View>
            <View style={styles.content}>
                <Text style={{ color: 'black' }}>
                    {props.value}
                </Text>
            </View>
            <TouchableOpacity style={{ width: 40, height: '100%', justifyContent: 'center', alignItems: 'center' }}
                onPress={props._clearFunc}
            >
                <IconMaterial
                    name='clear'
                    size={20}
                    color="#000000"
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: theme.sizes.radius,
        padding: theme.sizes.base + 4,
        marginBottom: theme.sizes.base / 2,
    },
    type: {
        width: 50
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 12
    }
})