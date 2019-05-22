import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Grid, Row, Col} from 'react-native-easy-grid'
import BackHeader from '../components/Headers/BackHeader'

class LoadingAnonBattle extends Component {
  render() {
    return (
      <Grid>
        <Col>
          <BackHeader navigation={this.props.navigation} />
          <Row>
            <Text style={{color: 'white'}}>Waiting for Players to Connect</Text>
          </Row>
        </Col>
      </Grid>
    )
  }
}

export default LoadingAnonBattle

const styles = StyleSheet.create({})
