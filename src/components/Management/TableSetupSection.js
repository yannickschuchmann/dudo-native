import React, { Component } from "react";
import { Constants } from "expo";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "native-base";
import { Row } from "react-native-easy-grid";

export default class CreateTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table_name_placeholder: "Escribe el nombre de tu Mesa",
      start_game: "Comenzar"
    };
  }
  render() {
    return (
      <View style={{ width: "100%" }}>
        <Row style={styles.inputContainer}>
          <Input
            placeholder={this.state.table_name_placeholder}
            placeholderTextColor="#95792a"
            style={styles.textInput}
          />
        </Row>
        <Row style={styles.buttonContainer}>
          <Button
            primary
            style={styles.StartGameButton}
            onPress={() => {
              this.props.navigation.push("GameTable");
            }}
          >
            <Text style={styles.StartGameButtonText}>
              {this.state.start_game}
            </Text>
          </Button>
        </Row>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "black",
    flex: 1
  },
  inputContainer: {
    marginTop: 15,
    marginLeft: "5%"
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "flex-end",
    marginRight: "5%"
  },
  textInput: {
    borderBottomColor: "rgba(200,178,115,1)",
    borderBottomWidth: 2,
    color: "rgba(200,178,115,1)"
  },
  StartGameButton: {
    backgroundColor: "rgba(149,121,42,1)",
    padding: 10
  },
  StartGameButtonText: {
    fontSize: 30,
    fontFamily: "MyriadPro-BoldCond",
    color: "white"
  }
});
