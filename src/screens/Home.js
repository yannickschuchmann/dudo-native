import React, { Component } from "react";
import { Constants } from "expo";
import { View, StyleSheet, StatusBar, Text, FlatList } from "react-native";
import { Container, Content } from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import { List, ListItem } from "react-native-elements";

import HomeHeader from "../components/Headers/HomeHeader";
import CreateTableSection from "../components/Management/CreateTableSection";
import TableList from "../components/Management/TableList";

export default class Home extends Component {
  render() {
    return (
      <Container style={styles.screenStyle}>
        <StatusBar hidden />
        <HomeHeader navigation={this.props.navigation} />
        <Grid>
          <Row size={20}>
            <CreateTableSection navigation={this.props.navigation} />
          </Row>
          <Row Row size={80}>
            <TableList navigation={this.props.navigation} />
          </Row>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: "black"
  }
});
