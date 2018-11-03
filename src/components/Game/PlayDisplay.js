import React, {Component} from 'react'
import {Contents} from 'expo'
import {StyleSheet} from 'react-native'
import {Col, Grid} from 'react-native-easy-grid'

import PlayPicker from './Picker/PlayPicker'
import PlayDecision from './PlayDecision'

import {scaleFontSize} from '../../helpers/responsive'

export default class PlayDisplay extends Component {
  state = {
    pressedPlay: false
  }

  onPressPlay = () => {
    this.setState({pressedPlay: true})
  }

  render() {
    return (
      <Grid>
        <Col style={styles.rightStatsContainer}>
          {this.state.pressedPlay ? (
            <PlayPicker
              onMove={this.props.onMove}
              game={this.props.game}
              lastMove={this.props.lastMove}
            />
          ) : (
            <PlayDecision
              allowedToDudoCalzo={this.props.allowedToDudoCalzo}
              onPlay={this.onPressPlay}
              onMove={this.props.onMove}
            />
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
