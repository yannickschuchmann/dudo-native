import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, StatusBar} from 'react-native'
import {Container} from 'native-base'
import {Grid, Row} from 'react-native-easy-grid'

import BackHeader from '../components/Headers/BackHeader'
import TableSetupSection from '../components/Management/TableSetupSection'
import FriendsList from '../components/Management/FriendsList'

export default class CreateTable extends Component {
  render() {
    return (
      <Container style={styles.root}>
        <StatusBar hidden />
        <BackHeader navigation={this.props.navigation} />
        <Grid>
          <Row size={30}>
            <TableSetupSection navigation={this.props.navigation} />
          </Row>
          <Row size={70}>
            <FriendsList />
          </Row>
        </Grid>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black'
  }
})
