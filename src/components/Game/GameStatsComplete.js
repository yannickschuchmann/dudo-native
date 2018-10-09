import React, { Component } from 'react';
import { Contents } from 'expo';
import { View, Text, StyleSheet } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Icon } from 'native-base';

export default class GameStatsComplete extends Component {
    constructor(props) {
        super(props)

        this.state = {
            "rounds_count": 1,
            "active_players_count": 2,
            "total_die": 10,
            "winner": null,
            "last_move": {
                "initiator": {
                    "name": "Sergio",
                    "is_current": false,
                    "is_active": true
                },
                "die": 3,
                "eyes": 5
            },
            "lang_dice": 'Dados',
            "lang_round": 'Ronda',
            "lang_players": 'Jugando',
            "lang_says": 'Dice:'
        }
    }
    render() {
        return (
            <Grid style={styles.statsContainer}>
                <Col style={styles.leftStatsContainer}>
                    <Col style={styles.leftColStyle}>
                        <Text style={styles.topStatText}>{this.state.lang_dice}</Text>
                        <Text style={styles.topStatText}>{this.state.lang_round}</Text>
                        <Text style={styles.topStatText}>{this.state.lang_players}</Text>
                    </Col>
                    <Col style={styles.rightColStyle}>
                        <Text style={styles.topStatText}>{this.state.total_die}</Text>
                        <Text style={styles.topStatText}>{this.state.rounds_count}</Text>
                        <Text style={styles.topStatText}>{this.state.active_players_count}</Text>
                    </Col>
                </Col>
                <Col style={styles.rightStatsContainer}>
                    <Row size={40}>
                        <Text style={styles.textSays}>{this.state.last_move.initiator.name}</Text>
                        <Text style={styles.textSays}>{this.state.lang_says}</Text>
                    </Row>
                    <Row size={60} style={styles.playSays}>
                        <Text style={styles.playTextSays}>{this.state.last_move.die}</Text>
                        <Icon
                            style={styles.playDiceSays}
                            name={`dice-${this.state.last_move.eyes}`}
                            type="MaterialCommunityIcons"
                        />
                    </Row>
                </Col>
            </Grid>
        );
    }
}
const styles = StyleSheet.create({
    statsContainer: {
        marginTop: '2,5%',
        minHeight: '25%',
        maxHeight: '25%'
    },
    leftStatsContainer: {
        backgroundColor: '#95792A',
        flex: 1,
        flexDirection: 'row'
    },
    leftColStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        left: '10%'
    },
    rightColStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightStatsContainer: {
        backgroundColor: '#C8B273',
        flex: 1,
        flexDirection: 'column'
    },
    topStatText: {
        fontSize: 30,
        fontFamily: "MyriadPro-BoldCond"
    },
    textSays: {
        marginTop: '7%',
        marginLeft: '7%',
        color: 'black',
        fontSize: 30,
        fontFamily: "MyriadPro-BoldCond",
        textAlign: 'center'
    },
    playSays: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    playTextSays: {
        marginTop: 10,
        color: 'black',
        fontSize: 60,
        fontFamily: "MyriadPro-BoldCond",
        textAlign: 'center'
    },
    playDiceSays: {
        fontSize: 50,
        textAlign: 'center'
    }
});
