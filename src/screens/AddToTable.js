import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, StatusBar} from 'react-native'
import {Container} from 'native-base'
import {Grid, Col} from 'react-native-easy-grid'

import BackHeader from '../components/Headers/BackHeader'
import FriendsList from '../components/Management/FriendsList'

export default class AddToTable extends Component {
  render() {
    return (
      <Container style={styles.root}>
        <StatusBar hidden />
        <BackHeader navigation={this.props.navigation} />
        <Grid>
          <Col>
            <FriendsList />
          </Col>
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
