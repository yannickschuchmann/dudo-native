import React, { Component } from "react";
import { Constants } from "expo";
import { StyleSheet, StatusBar, Text } from "react-native";
import { Grid, Col } from "react-native-easy-grid";

export default class GameEnd extends Component {
  render() {
    return (
      <Container style={styles.root}>
        <StatusBar hidden />
        <Grid>
          <Text style={{ color: "white" }}>Hello</Text>
        </Grid>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: "black"
  }
});
