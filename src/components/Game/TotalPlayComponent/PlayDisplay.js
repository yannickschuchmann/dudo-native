import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Col, Grid } from 'react-native-easy-grid'

import PlayPicker from './PlayPicker'
import PlayDecision from './PlayDecision'

export default class PlayDisplay extends Component {
  state = {
    pressedPlay: false
  }

  onPressPlay = () => {
    this.setState({ pressedPlay: true })
  }

  onClosePicker = () => {
    this.setState({ pressedPlay: false })
  }

  render () {
    return (
      <Grid>
        <Col style={styles.rightStatsContainer}>
          {this.state.pressedPlay ? (
            <PlayPicker
              playIsLoading={this.props.playIsLoading}
              onMove={this.props.onMove}
              game={this.props.game}
              lastMove={this.props.lastMove}
              closePicker={this.onClosePicker}
            />
          ) : (
            <PlayDecision
              playIsLoading={this.props.playIsLoading}
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
