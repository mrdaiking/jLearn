import React, { Component } from "react";
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Icon, Accordion, Text, View } from "native-base";


interface Props {
    title?: string,
    content?: string
}

export default function AccordionCard(props: Props) {
    const [isShowContent, setFlagIsShowContent] = useState(false);
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                <Text>{'Example: ' + props.title}</Text>
                <TouchableOpacity
                    onPress={() => setFlagIsShowContent(!isShowContent)}
                >

                    {isShowContent ?
                        <Icon style={{ fontSize: 18 }} name="remove" />
                        :
                        <Icon style={{ fontSize: 18 }} name="add" />
                    }
                </TouchableOpacity>
            </View>
            {isShowContent && <Text>{props.content}</Text>}
        </View>


    );
}