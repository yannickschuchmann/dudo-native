import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground } from 'react-native';
import { Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import DiceAmountPicker from './DiceAmountPicker';
import DiceTypePicker from './DiceTypePicker';


export default class PlayPicker extends Component {
    render() {
        return (
            <Col style={styles.rootContainer}>
                <Row style={styles.pickerRow}>
                    <DiceAmountPicker />
                </Row>
                <Row fluidWidth style={styles.pickerRow}>
                    <DiceTypePicker />
                </Row>
                <Row style={styles.pickerRow}>
                    <Button
                        block
                        primary
                        style={styles.buttonContainer}
                    >
                        <Text style={styles.buttonText}>Play</Text>
                    </Button>
                </Row>
            </Col>
        );
    }
}
const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    pickerRow: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flex: 1,
        marginTop: '3%',
        marginRight: '5%'
    },
    buttonText: {
        fontSize: 30,
        fontFamily: "MyriadPro-BoldCond",
        color: 'white'
    }
});
