import React, { Component } from "react";
import { Constants } from "expo";
import { StyleSheet, TextInput, StatusBar } from "react-native";
import { Header, Left, Body, Title, Right, Button, Icon } from "native-base";

export default class HomeHeader extends Component {
  render() {
    return (
      <Header style={styles.homeHeader}>
        <Left />
        <Body>
          <Title style={styles.headerTitle}>DUDO</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon
              style={styles.icon}
              name="user"
              type="EvilIcons"
              onPress={() => {
                this.props.navigation.push("PlayerProfile");
              }}
            />
          </Button>
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    backgroundColor: "transparent",
    fontSize: 30,
    fontFamily: "MyriadPro-BoldCond",
    lineHeight: 45,
    letterSpacing: 0,
    textAlign: "center",
    color: "rgba(200,178,114,1)"
  },
  homeHeader: {
    backgroundColor: "black",
    top: Constants.deviceName === "iPhone X" ? 45 : 0,
    left: Constants.deviceName === "iPhone X" ? 0 : 0,
    height: Constants.deviceName === "iPhone X" ? 70 : 70,
    width: Constants.deviceName === "iPhone X" ? 375 : undefined,
    right: 0,
    borderWidth: 1,
    borderBottomColor: "rgba(200,178,115,1)",
    borderBottomWidth: 4
  },
  icon: {
    right: 20,
    position: "absolute",
    backgroundColor: "transparent",
    color: "rgba(200,178,115,1)",
    fontSize: 40
  }
});
