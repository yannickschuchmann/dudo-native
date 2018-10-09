import React, { Component } from "react";
import { Constants } from "expo";
import { Text, StyleSheet, Image, StatusBar } from "react-native";
import { Container, Content, Button, Footer } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";

import BackHeader from "../components/Headers/BackHeader";

export default class PlayerProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang_spanish: "Español",
      lang_german: "Deutsch",
      lang_english: "English",
      logout_button: "Salir"
    };
  }
  render() {
    return (
      <Container style={styles.root}>
        <StatusBar hidden />
        <BackHeader navigation={this.props.navigation} />
        <Grid style={{ alignItems: "center" }}>
          <Row size={40}>
            <Image
              source={require("../assets/UserProfilePlaceholder.png")}
              style={styles.image}
            />
          </Row>
          <Row size={45} style={{ marginLeft: "5%" }}>
            <Col>
              <Button
                primary
                style={styles.LangButtonSpanish}
                onPress={() => {
                  this.props.navigation.push("Home");
                }}
              >
                <Text style={styles.LogoutButtonText}>
                  {this.state.lang_spanish}
                </Text>
              </Button>
            </Col>
            <Col>
              <Button
                primary
                style={styles.LangButtonGerman}
                onPress={() => {
                  this.props.navigation.push("Home");
                }}
              >
                <Text style={styles.LogoutButtonText}>
                  {this.state.lang_german}
                </Text>
              </Button>
            </Col>
            <Col>
              <Button
                primary
                style={styles.LangButtonEnglish}
                onPress={() => {
                  this.props.navigation.push("Home");
                }}
              >
                <Text style={styles.LogoutButtonText}>
                  {this.state.lang_english}
                </Text>
              </Button>
            </Col>
          </Row>
          <Row size={15}>
            <Button
              primary
              style={styles.LogoutButton}
              onPress={() => {
                this.props.navigation.push("Login");
              }}
            >
              <Text style={styles.LogoutButtonText}>
                {this.state.logout_button}
              </Text>
            </Button>
          </Row>
        </Grid>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: "black"
  },
  image: {
    marginTop: 10,
    maxHeight: 200,
    maxWidth: 200
  },
  LogoutButton: {
    alignSelf: "center",
    justifyContent: "center",
    height: 50,
    width: 200,
    opacity: 1,
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: "red",
    borderColor: "rgba(255,255,255,1)"
  },
  LangButtonSpanish: {
    backgroundColor: "blue",
    width: "85%",
    justifyContent: "center"
  },
  LangButtonGerman: {
    backgroundColor: "green",
    width: "85%",
    justifyContent: "center"
  },
  LangButtonEnglish: {
    backgroundColor: "purple",
    width: "85%",
    justifyContent: "center"
  },
  LogoutButtonText: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    color: "white"
  }
});
