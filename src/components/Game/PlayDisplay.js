import React, {Component} from 'react'
import {Contents} from 'expo'
import {StyleSheet} from 'react-native'
import {Col, Grid} from 'react-native-easy-grid'

import PlayPicker from './Picker/PlayPicker'
import PlayDecision from './PlayDecision'

export default class PlayDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      last_move: {
        initiator: {
          name: 'Sergio',
          is_current: false,
          is_active: true
        },
        die: 3,
        eyes: 5
      },
      pressedPlay: false
    }
  }
  pressingPlay = () => {
    this.setState({pressedPlay: true})
  }
  render() {
    return (
      <Grid>
        <Col style={styles.rightStatsContainer}>
          {this.state.pressedPlay ? (
            <PlayPicker />
          ) : (
            <PlayDecision onPress={this.pressingPlay} />
          )}
        </Col>
      </Grid>
    )
  }
}
const styles = StyleSheet.create({
  rightStatsContainer: {
    backgroundColor: 'black',
    flex: 1
  }
})
