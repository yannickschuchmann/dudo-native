import React, { Component } from "react";
import { View, StyleSheet, Text, Image, ImageBackground } from "react-native";
import { Icon, Button } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import DiceAmountPicker from "./DiceAmountPicker";
import DiceTypePicker from "./DiceTypePicker";

export default class PlayPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      button_play: "Jugar"
    };
  }

  render() {
    return (
      <Col style={styles.rootContainer}>
        <Row style={styles.pickerRow}>
          <DiceAmountPicker />
        </Row>
        <Row fluidWidth style={styles.pickerRow}>
          <DiceTypePicker />
        </Row>
        <Row style={styles.pickerRow}>
          <Button block primary style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{this.state.button_play}</Text>
          </Button>
        </Row>
      </Col>
    );
  }
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  pickerRow: {
    marginTop: "3%",
    marginLeft: "5%",
    marginRight: "5%",
    height: "27%"
  },
  buttonContainer: {
    flex: 1,
    marginTop: "3%",
    marginRight: "5%"
  },
  buttonText: {
    fontSize: 30,
    fontFamily: "MyriadPro-BoldCond",
    color: "white"
  }
});
