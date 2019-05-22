import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {Grid, Row, Col} from 'react-native-easy-grid'

import BackHeader from '../components/Headers/BackHeader'
import FriendsList from '../components/Management/FriendsList'

class LoadingFriendBattle extends Component {
  render() {
    return (
      <Grid>
        <Col>
          <BackHeader navigation={this.props.navigation} />
          <Row>
            <FriendsList />
          </Row>
        </Col>
      </Grid>
    )
  }
}

export default LoadingFriendBattle

const styles = StyleSheet.create({})
