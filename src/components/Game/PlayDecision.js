import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class PlayDecision extends Component {
    render() {
        return (
            <Col>
                <Col>
                    <Button
                        block
                        primary
                        style={styles.buttonContainer}
                        onPress={this.props.onPress}
                        >
                            <Text style={styles.buttonText}>Play</Text>
                        </Button>
                        <Button block danger style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Dudo</Text>
                        </Button>
                        <Button block success style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Spot On!</Text>
                        </Button>
                    </Col>
                </Col>
            );
        }
    }
const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 2,
        flex: 0.3,
        marginTop: '3%',
        marginRight: '5%',
    },
    buttonText: {
        fontSize: 30,
        fontFamily: "MyriadPro-BoldCond",
        color: 'white'
    }
});
