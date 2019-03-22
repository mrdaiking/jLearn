import * as React from "react";
import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, TextInput, View } from "react-native";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
interface Props {
    label: string,
    iconName: string,
    placeHolder: string,

}

export default function CustomTextInput(props: Props) {
    const [errorMessage, setValue] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.textInputInfo}>
                <Text style={styles.label}>{props.label}</Text>
                <IconMaterial
                    name={props.iconName}
                    size={20}
                    color="#FFFFFF"
                />
            </View>
            <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder={props.placeHolder}
                placeholderTextColor='#757575'
                underlineColorAndroid='transparent'
                // onChangeText={password => this.setState({ password })}
                value={''}
            />
            <Text style={styles.errorLabel}>{errorMessage}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        marginTop: 10
    },
    textInputInfo: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontSize: 19,
        color: '#FFFFFF',
        fontFamily: 'Arial'
    },
    errorLabel: {
        color: "red",
        marginTop: 5
    },
    textInput: {
        color: '#FFFFFF',
        height: 50,
        padding: 15,
        backgroundColor: '#F0F1F4',
        opacity: 0.2,
        borderRadius: 6,
        marginTop: 5
    }
})