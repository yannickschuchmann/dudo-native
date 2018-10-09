import React, { Component } from "react";
import { Constants } from "expo";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  View
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Icon } from "native-base";

export default class DiceTypePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rounds_count: 1,
      active_players_count: 2,
      total_die: 10,
      winner: null,
      min_play_amount: 2,
      last_move: {
        initiator: {
          name: "Yannick",
          is_current: false,
          is_active: true
        },
        die: 3,
        eyes: 5
      },
      picked_eyes: 1
    };
  }
  componentDidMount() {
    this.setState({ picked_eyes: this.state.last_move.eyes });
  }
  increaseAllowed = () => {
    return this.state.picked_eyes < 6;
  };
  decreaseAllowed = () => {
    return this.state.picked_eyes > 1;
  };
  incrementAmount = () => {
    this.setState({ picked_eyes: this.state.picked_eyes + 1 });
  };
  decreaseAmount = () => {
    this.setState({ picked_eyes: this.state.picked_eyes - 1 });
  };
  render() {
    return (
      <Row>
        <Col size={10} />
        <Col size={25}>
          <TouchableOpacity
            onPress={this.decreaseAmount}
            disabled={!this.decreaseAllowed()}
          >
            <Image
              source={require("../../../assets/pickerArrow.png")}
              style={styles.pickerContainerLeft}
            />
          </TouchableOpacity>
        </Col>
        <Col size={25}>
          <ImageBackground
            source={require("../../../assets/pickerContainer.png")}
            style={styles.pickerContainerLeft}
          >
            <Icon
              style={styles.diceTypeSaid}
              name={`dice-${this.state.picked_eyes}`}
              type="MaterialCommunityIcons"
            />
          </ImageBackground>
        </Col>
        <Col size={25}>
          <TouchableOpacity
            onPress={this.incrementAmount}
            disabled={!this.increaseAllowed()}
          >
            <Image
              source={require("../../../assets/pickerArrow.png")}
              style={styles.pickerContainerRight}
            />
          </TouchableOpacity>
        </Col>
        <Col />
      </Row>
    );
  }
}
const styles = StyleSheet.create({
  pickerContainerLeft: {
    height: 65,
    width: 65,
    alignItems: "center",
    justifyContent: "center"
  },
  pickerContainerRight: {
    height: 65,
    width: 65,
    transform: [{ rotateZ: "180deg" }]
  },
  diceTypeSaid: {
    color: "#95792A",
    fontSize: 50
  }
});
