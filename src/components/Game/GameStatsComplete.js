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
            "winner": null
        }
    }
    render() {
        return (
            <Grid style={styles.statsContainer}>
                <Col style={styles.leftStatsContainer}>
                    <Col style={styles.leftColStyle}>
                        <Text style={styles.topStatText}>Dice</Text>
                        <Text style={styles.statText}>Players</Text>
                    </Col>
                    <Col style={styles.rightColStyle}>
                        <Text style={styles.topStatText}>{this.state.total_die}</Text>
                        <Text style={styles.statText}>{this.state.active_players_count}</Text>
                    </Col>
                </Col>
                <Col style={styles.rightStatsContainer}>
                    <Col style={styles.leftColStyle}>
                        <Text style={styles.topStatText}>Round</Text>

                    </Col>
                    <Col style={styles.rightColStyle}>
                        <Text style={styles.topStatText}>{this.state.rounds_count}</Text>

                    </Col>
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
    rightStatsContainer: {
        backgroundColor: '#C8B273',
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
    statText: {
        marginTop: '15%',
        fontSize: 30,
        fontFamily: "MyriadPro-BoldCond"
    },
    topStatText: {
        marginBottom: '15%',
        fontSize: 30,
        fontFamily: "MyriadPro-BoldCond"
    },
    timerIcon: {
        marginTop: '10%',
        backgroundColor: "transparent",
        color: "rgba(0,0,0,1)",
        fontSize: 40
    },
    timer: {
        marginTop: '10%',
        fontSize: 30,
        fontFamily: "MyriadPro-BoldCond"
    }
});
