import * as React from "react";
import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Picker, TextInput } from "react-native";
import { theme } from '../../app/constants';
import { CustomTextInput } from '../../authentication/components';
import DropDownComponent from "./DropDownComponent";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
interface Props {
    type: string,
    value?: string,
    nameType?: string,
    addPlus?(data: any): void,
    addValue(data: any): void,
    exportValue(data: string): void,
    isLast?: boolean
}

export default function AddingComponent(props: Props) {
    const [language, setLanguage] = useState('');
    const [value, setValue] = useState('');
    const [type, setType] = useState('');
    let verbTypes = [{
        value: 'ない形',
        hiragana: 'ないけい'
    }, {
        value: 'ます形',
        hiragana: 'ますけい'
    }, {
        value: '普通形',
        hiragana: 'ふつけい'
    }, {
        value: 'て形',
        hiragana: 'てけい'
    }, {
        value: 'た形',
        hiragana: 'たけい'
    }, {
        value: '辞書系',
        hiragana: 'じしょけい'
    }, {
        value: '受け身形',
        hiragana: 'うけみけい'
    }, {
        value: '命令形',
        hiragana: 'う'
    }, {
        value: '可能形',
        hiragana: 'う'
    }, {
        value: '使役形',
        hiragana: 'う'
    }, {
        value: '意向形',
        hiragana: 'う'
    }, {
        value: 'ている形',
        hiragana: ''
    }, {
        value: 'ば形',
        hiragana: ''
    }
    ];
    let adjTypes = [{
        value: 'い',
        hiragana: 'い'
    }, {
        value: 'な',
        hiragana: 'な'
    }
    ];
    async function addNew() {
        let newValue = {
            isHas: true,
            nameType: type,
            value
        }

        // if (validateDataInput(newValue.nameType, newValue.value)) {
        //     await props.addValue(newValue);
        //     clearAllInput();
        // } else {
        //     return;
        // }
        await props.addValue(newValue);
        clearAllInput();
    }

    function clearAllInput() {
        setValue('');
        setType('');
    }

    function onValueChange(value: string, type: string) {
        setValue(value);
        props.exportValue(value);
    }

    function getTypeVerb(type: string) {
        setType(type);
    }

    function validateDataInput(typeInput: any, valueInput: any) {
        if (typeInput == '' || typeInput == ' ' || typeInput == undefined) {
            alert('Please select type')
            return false;
        }
        if (valueInput == '' || valueInput == ' ' || valueInput == undefined) {
            alert('Please input value');
            return false;
        }
        return true;
    }

    function renderButton() {
        console.log('IS LAST---', props.isLast)
        return props.isLast ?
            <TouchableOpacity style={styles.button}
                onPress={() => addNew()}
            >
                <IconMaterial
                    name='add'
                    size={20}
                    color="#000000"
                />
            </TouchableOpacity>
            :
            null
    }

    function renderDropdown(type: any) {
        return type == 'V' || type == 'A' ?
            < View style={styles.dropboxType} >
                <DropDownComponent
                    source={type == 'V' ? verbTypes : adjTypes}
                    onChangeText={(type) => getTypeVerb(type)}
                    value={props.nameType || ''}
                />
            </View >
            : null
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text>{props.type}</Text>
            </View>
            {
                renderDropdown(props.type)
            }

            <View style={styles.textBox}>
                <TextInput
                    secureTextEntry={false}
                    autoCapitalize="none"
                    placeholder='Enter here...'
                    value={value || props.value}
                    onChangeText={(value) => onValueChange(value, type)}
                    style={styles.inputValue}
                />
            </View>
            {
                renderButton()
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#D2EEFB',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: theme.sizes.radius,
        padding: 5,
        marginBottom: theme.sizes.base,
    },
    title: {
        width: 30
    },
    dropboxType: {
        width: 80,
        alignSelf: 'center'
    },
    textBox: {
        flex: 2
    },
    button: {
        width: 40,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    inputValue: {
        height: 40,
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        color: '#000000'
    }
});