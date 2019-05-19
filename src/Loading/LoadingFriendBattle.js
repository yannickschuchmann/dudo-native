import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Icon} from 'native-base'
import {Grid, Row, Col} from 'react-native-easy-grid'

import VibrateButton from '../components/vibrateButton'
import FriendsList from '../components/Management/FriendsList'

class LoadingFriendBattle extends Component {
  render() {
    return (
      <Grid>
        <Col>
          <Row size={30}>
            <Text style={{color: 'white'}}>Loading Friend Battle</Text>
            <VibrateButton
              transparent
              onPress={() => {
                this.props.navigation.goBack()
              }}
            >
              <Icon style={styles.icon} name="arrow-back" />
            </VibrateButton>
          </Row>
          <Row size={70}>
            <FriendsList />
          </Row>
        </Col>
      </Grid>
    )
  }
}

export default LoadingFriendBattle

const styles = StyleSheet.create({})
