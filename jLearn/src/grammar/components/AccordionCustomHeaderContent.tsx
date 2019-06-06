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
    return (
        <View style={{ width: '100%' }}>
            {
                props.examples && props.examples.map((item: any, index: number) => {
                    return <AccordionCard
                        index={index}
                        title={item.value}
                        content={item.valueVN}
                    />
                })
            }
        </View>
    );
}