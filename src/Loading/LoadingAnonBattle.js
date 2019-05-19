import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Icon} from 'native-base'
import {Grid, Row, Col} from 'react-native-easy-grid'

import VibrateButton from '../components/vibrateButton'

class LoadingAnonBattle extends Component {
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
          <Row size={70} />
        </Col>
      </Grid>
    )
  }
}

export default LoadingAnonBattle

const styles = StyleSheet.create({})
