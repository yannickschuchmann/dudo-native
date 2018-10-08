import React, { Component } from 'react';
import { Contents } from 'expo';
import { View, StyleSheet, Text } from 'react-native';
import { Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import PlayPicker from './Picker/PlayPicker';
import PlayDecision from './PlayDecision';

export default class PlayDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            "last_move": {
                "initiator": {
                    "name": "Sergio",
                    "is_current": false,
                    "is_active": true
                },
                "die": 3,
                "eyes": 5
            },
            "pressedPlay": false
        }
    }
    pressingPlay = () => {
        this.setState({ pressedPlay: true });
    }

    render() {
        return (
            <Grid>
                <Col style={styles.leftStatsContainer}>
                    <Row style={styles.wordDirection}>
                        <Text style={styles.textSays}>{this.state.last_move.initiator.name}</Text>
                        <Text style={styles.textSays}>says:</Text>
                    </Row>
                    <Row style={styles.playMade}>
                        <Text style={styles.textDiceAmount}>{this.state.last_move.die}</Text>
                        <Icon
                            style={styles.diceTypeSaid}
                            name={`dice-${this.state.last_move.eyes}`}
                            type="MaterialCommunityIcons"
                        />
                    </Row>
                </Col>
                <Col style={styles.rightStatsContainer}>
                    {this.state.pressedPlay ? <PlayPicker /> : <PlayDecision onPress={this.pressingPlay}/> }
                </Col>
            </Grid>
        );
    }
}
const styles = StyleSheet.create({
    leftStatsContainer: {
        backgroundColor: 'black',
        flex: 1,
        flexDirection: 'column',
        maxWidth: '40%'
    },
    wordDirection: {
        flex: 1,
        flexDirection: 'column'
    },
    textSays: {
        marginTop: '7%',
        marginLeft: '7%',
        color: 'rgba(200,178,115,1)',
        fontSize: 30,
        fontFamily: "MyriadPro-BoldCond",
        textAlign: 'center'
    },
    playMade: {
        marginLeft: '25%'
    },
    textDiceAmount: {
        color: 'rgba(200,178,115,1)',
        fontSize: 70,
        fontFamily: "MyriadPro-BoldCond"
    },
    diceTypeSaid: {
        color: "rgba(200,178,115,1)",
        fontSize: 65
    },
    rightStatsContainer: {
        backgroundColor: 'black',
        flex: 1,
    }
});
