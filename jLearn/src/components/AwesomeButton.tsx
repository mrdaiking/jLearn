import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
    buttonColor: string,
    fontSize: number,
    title: string,
    _onPressFunc: () => void;

}
export default function AwesomeButton(props: Props) {
    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: props.buttonColor }]}
            onPress={() => props._onPressFunc()}
        >
            <Text
                style={[styles.textStyle, { fontSize: props.fontSize }]}
            >{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 28
    },
    textStyle: {
        fontSize: 19,
        color: "#FFFFFF"
    }
})