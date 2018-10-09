import React, { Component } from "react";
import { Constants } from "expo";
import { StyleSheet, StatusBar } from "react-native";
import { Header, Left, Button, Icon, Title, Right, Body } from "native-base";

export default class BackHeader extends Component {
  render() {
    return (
      <Header style={styles.homeHeader}>
        <Left>
          <Button transparent>
            <Icon
              style={styles.icon}
              name="arrow-back"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerTitle}>DUDO</Title>
        </Body>
        <Right />
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
    bottom: 5,
    color: "rgba(200,178,115,1)",
    fontSize: 40
  }
});
