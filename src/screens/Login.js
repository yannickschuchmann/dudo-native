import React, { Component } from "react";
import { Constants } from 'expo';
import { StyleSheet, Image, StatusBar, Text } from 'react-native';
import { Container, Content, Button, Card, CardItem } from 'native-base';

export default class Login extends Component {

    render() {
        return (
            <Container style={styles.screenStyle}>
                <StatusBar hidden />
                <Content style={styles.borderContainer}>
                    <Card
                        padded
                        style={styles.cardContainer}>
                        <CardItem style={styles.CardItemContainer}>
                            <Image
                                source={require("../assets/dudoLogo.png")}
                                style={styles.image}
                            />
                        </CardItem>
                        <CardItem style={styles.CardItemContainer}>
                            <Button
                                primary
                                style={styles.FacebookLoginButton}
                                onPress={() => {
                                  this.props.navigation.push("Home");
                                }}
                            >
                                <Text style={styles.FacebookLoginButtonText}>Facebook Login</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    screenStyle: {
        backgroundColor: "#000000",
        flex: 1,
    },
    image: {
        height: 170,
        width: 300,
    },
    FacebookLoginButton: {
        alignSelf:'center',
        justifyContent: 'center',
        height: 50,
        width: 200,
        opacity: 1,
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor: "rgba(59,89,152,1)",
        borderColor: "rgba(255,255,255,1)"
    },
    FacebookLoginButtonText: {
        fontSize: 20,
        fontFamily: "Roboto-Bold",
        color: 'white'
    },
    borderContainer: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5,
        top: Constants.deviceName === "iPhone X" ? 40 : 8.02,
        right: Constants.deviceName === "iPhone X" ? 6 : 6.02,
        bottom: Constants.deviceName === "iPhone X" ? 10 : 9.95,
        borderWidth: 2,
        borderColor: "rgba(200,178,115,1)",
        borderRadius: 20,
        position: "absolute"
    },
    CardItemContainer: {
        backgroundColor: 'black',
        justifyContent: 'center'
    },
    cardContainer: {
        top: '50%',
        borderColor: 'black',
        backgroundColor: 'black'
    }
});
