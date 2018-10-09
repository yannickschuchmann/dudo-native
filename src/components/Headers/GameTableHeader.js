import React, { Component } from "react";
import { Constants } from "expo";
import { StyleSheet, TextInput, StatusBar } from "react-native";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";

export default class GameTableHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        id: 50,
        name: "Yannick's Table",
        players: 2
      }
    };
  }
  render() {
    return (
      <Header style={styles.homeHeader}>
        <Left>
          <Button transparent>
            <Icon
              style={styles.icon}
              name="arrow-back"
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerTitle}>{this.state.data.name}</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon
              style={styles.icon}
              name="account-plus-outline"
              type="MaterialCommunityIcons"
              onPress={() => {
                this.props.navigation.push("AddToTable");
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
    color: "rgba(200,178,114,1)",
    width: 300
  },
  homeHeader: {
    backgroundColor: "black",
    top: Constants.deviceName === "iPhone X" ? 45 : 0,
    left: Constants.deviceName === "iPhone X" ? 0 : 0,
    height: Constants.deviceName === "iPhone X" ? 70 : 70,
    width: Constants.deviceName === "iPhone X" ? 375 : undefined,
    right: 0,
    top: 0,
    height: 70,
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
