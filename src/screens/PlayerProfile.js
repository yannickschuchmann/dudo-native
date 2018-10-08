import React, { Component } from 'react';
import { Constants } from 'expo';
import { Text, StyleSheet, Image, StatusBar } from 'react-native';
import { Container, Content, Button, Footer } from 'native-base';

import BackHeader from '../components/Headers/BackHeader';

export default class PlayerProfile extends Component {
    render() {
        return (
            <Container style={styles.root}>
                <StatusBar hidden />
                <BackHeader
                    navigation={this.props.navigation}
                />
                <Content style={styles.contentContainer}>
                    <Image
                        source={require("../assets/UserProfilePlaceholder.png")}
                        style={styles.image}
                    />
                </Content>
                <Footer style={styles.contentContainer}>
                    <Button
                        primary
                        style={styles.LogoutButton}
                        onPress={() => {
                          this.props.navigation.push("Login");
                        }}
                    >
                        <Text style={styles.LogoutButtonText}>Logout</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    root: {
        backgroundColor: "black",
    },
    contentContainer: {
        backgroundColor: 'black',
        height: 100,
        borderTopWidth: 0
    },
    image: {
        height: Constants.deviceName === "iPhone X" ? 200 : 200,
        width: Constants.deviceName === "iPhone X" ? 200 : 200,
        top: Constants.deviceName === "iPhone X" ? "18.72%" : "13.94%",
        left: Constants.deviceName === "iPhone X" ? "23.6%" : "23.47%",
    },
    LogoutButton: {
        alignSelf:'center',
        justifyContent: 'center',
        height: 50,
        width: 200,
        opacity: 1,
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor: "red",
        borderColor: "rgba(255,255,255,1)",
    },
    LogoutButtonText: {
        fontSize: 20,
        fontFamily: "Roboto-Bold",
        color: 'white'
    }
});
