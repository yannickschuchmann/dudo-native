import React, { Component } from "react";
import { Constants } from "expo";
import { StyleSheet, Image, StatusBar, Text } from "react-native";
import { Container, Button } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

export default class Login extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "black" }}>
        <StatusBar hidden />
        <Grid>
          <Row size={20} />
          <Row size={60} style={{}}>
            <Col style={styles.justifyAll}>
              <Row>
                <Image
                  source={require("../assets/dudoLogo.png")}
                  style={styles.image}
                />
              </Row>
              <Row>
                <Button
                  primary
                  style={styles.FacebookLoginButton}
                  onPress={() => {
                    this.props.navigation.push("Home");
                  }}
                >
                  <Text style={styles.FacebookLoginButtonText}>
                    Facebook Login
                  </Text>
                </Button>
              </Row>
            </Col>
          </Row>
          <Row size={20} />
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  justifyAll: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  CardItemContainer: {
    backgroundColor: "blue"
  },
  image: {
    height: 170,
    width: 300
  },
  FacebookLoginButton: {
    alignSelf: "center",
    justifyContent: "center",
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
    color: "white"
  }
});
