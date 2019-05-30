import React, { Component } from 'react';
import { useState } from "react";
import { Dropdown } from 'react-native-material-dropdown';

interface Props {
    source: { value: string, hiragana: string }[],
    value?: string
    onChangeText(value: string): void,
    label?: string
}

export default function LevelDropBox(props: Props) {
    const [value, setValue] = useState('');
    return (
        <Dropdown
            label={props.label || 'Type'}
            data={props.source}
            pickerStyle={{ width: '50%' }}
            onChangeText={(value) => props.onChangeText(value)}
            value={value || props.value}
        />
    );
}

export {
    LevelDropBox
}