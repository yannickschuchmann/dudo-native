import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, ImageBackground, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class DiceAmountPicker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            "rounds_count": 1,
            "active_players_count": 2,
            "total_die": 10,
            "winner": null,
            "last_move": {
                "initiator": {
                    "name": "Yannick",
                    "is_current": false,
                    "is_active": true
                },
                "die": 3,
                "eyes": 5
            },
            "picked_amount": null
        }
    }

    componentDidMount() {
        this.setState({ picked_amount: this.state.last_move.die});
    }
    increaseAllowed = () => {
        return this.state.picked_amount < this.state.total_die;
    }
    decreaseAllowed = () => {
        return this.state.picked_amount > 1;
    }
    incrementAmount = () => {
        this.setState({ picked_amount: this.state.picked_amount + 1 });
    }
    decreaseAmount = () => {
        this.setState({ picked_amount: this.state.picked_amount - 1 });
    }
    render() {
        return (
            <Col>
                <Row>
                    <TouchableOpacity
                        onPress={this.decreaseAmount}
                        disabled={!this.decreaseAllowed()}
                    >
                        <Image
                            source={require('../../../assets/pickerArrow.png')}
                            style={styles.pickerContainerLeft}
                        />
                    </TouchableOpacity>
                    <ImageBackground
                        source={require('../../../assets/pickerContainer.png')}
                        style={styles.pickerContainerLeft}
                        >
                        <Text style={styles.picketAmountText}>{this.state.picked_amount}</Text>
                    </ImageBackground>
                    <TouchableOpacity
                        onPress={this.incrementAmount}
                        disabled={!this.increaseAllowed()}
                    >
                        <Image
                            source={require('../../../assets/pickerArrow.png')}
                            style={styles.pickerContainerRight}
                        />
                    </TouchableOpacity>
                </Row>
            </Col>
        );
    }
}
const styles = StyleSheet.create({
    pickerContainerLeft: {
        height: 65,
        width: 65,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerContainerRight: {
        height: 65,
        width: 65,
        transform: ([{ rotateZ: '180deg' }])
    },
    picketAmountText: {
        fontSize: 50,
        fontFamily: "MyriadPro-BoldCond",
        color: '#95792A',
        top: '10%',
    },

});
