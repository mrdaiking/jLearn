import * as React from "react";
import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, TextInput, View } from "react-native";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP, heightPercentageToDP, RF } from "../../app/utils/responsive";
interface Props {
    label: string,
    iconName: string,
    placeHolder: string,
    secureTextEntry: boolean,
    value: string,
    setValueInput(value: string): void
}

export default function CustomTextInput(props: Props) {
    const [errorMessage, setErrorMessage] = useState('')
    const [value, setValue] = useState('');
    function onValueChange(value: string) {
        setValue(value);
        props.setValueInput(value);
    }
    return (
        <View style={styles.container}>
            <View style={styles.textInputInfo}>
                <Text
                    allowFontScaling={true}
                    style={styles.label}>{props.label}</Text>
                {/* <IconMaterial
                    name={props.iconName}
                    size={20}
                    color="#FFFFFF"
                /> */}
            </View>
            <TextInput
                secureTextEntry={props.secureTextEntry}
                style={styles.textInput}
                autoCapitalize="none"
                placeholder={props.placeHolder}
                placeholderTextColor='#757575'
                underlineColorAndroid='transparent'
                onChangeText={(value) => { onValueChange(value) }}
                value={value}
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
        color: '#000000',
        fontFamily: 'Arial'
    },
    errorLabel: {
        color: "red",
        marginTop: 5
    },
    textInput: {
        color: '#000000',
        height: 50,
        padding: 15,
        backgroundColor: '#F0F1F4',
        borderRadius: 5,
        marginTop: 5,
    }
})