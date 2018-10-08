import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, ImageBackground, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class CupButton extends Component {
    constructor(props) {
        super(props);

        this.state= {
            "cup": {
                "1": 1,
                "3": 2,
                "4": 1,
                "6": 1
            }
        }
    }
    render() {
        return (
            <Grid>
                <Row>
                    <Col size={33}></Col>
                    <Col size={34} style={styles.cupIconContainer}>
                        <TouchableOpacity onPress={this.props.onPress}>
                          <Image  style={styles.cupIcon} resizeMode="contain" source={require("../../assets/cup.png")}/>
                        </TouchableOpacity>
                    </Col>
                    <Col size={33}></Col>
                </Row>
            </Grid>
        );
    }
}
const styles = StyleSheet.create({
    cupIcon: {
        height: 70,
        width: 70
    },
    cupIconContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
