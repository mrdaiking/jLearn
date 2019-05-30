import React, { Component } from "react";
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AccordionCard from './AccordionCard';
import { Container, Header, Content, Icon, Accordion, Text, View } from "native-base";

const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];
interface Props {
    examples: any[]
}

export default function AccordionCustomHeaderContent(props: Props) {
    function _renderContent(item: any) {
        return (
            <Text
                style={{
                    backgroundColor: "#e3f1f1",
                    padding: 10,
                    fontStyle: "italic",
                }}
            >
                {'Example: ' + item.content}
            </Text>
        );
    }

    return (
        <View style={{ width: '100%' }}>
            {
                props.examples && props.examples.map((item: any) => {
                    return <AccordionCard
                        title={item.value}
                    // content={item.content}
                    />
                })
            }
        </View>
    );
}