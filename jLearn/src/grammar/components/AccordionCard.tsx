import React, { Component } from "react";
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Icon, Accordion, Text, View } from "native-base";


interface Props {
    index: number,
    title?: string,
    content?: string
}

export default function AccordionCard(props: Props) {
    const [isShowContent, setFlagIsShowContent] = useState(false);
    return (
        <View style={{ width: '100%', backgroundColor: 'yellow' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#E6E9ED' }}>
                <Text style={{ flex: 1 }}>{`例 ${props.index + 1}: ${props.title}`}</Text>
                <TouchableOpacity
                    onPress={() => setFlagIsShowContent(!isShowContent)}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{isShowContent ? '-' : '+'}</Text>
                    </View>

                </TouchableOpacity>
            </View>
            {
                isShowContent &&
                <View style={{ backgroundColor: '#4FC1E9' }}>
                    <Text >{`Ví dụ ${props.index + 1} :${props.content}`}</Text>
                </View>
            }
        </View >
    );
}