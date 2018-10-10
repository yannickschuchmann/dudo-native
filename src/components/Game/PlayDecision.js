import React, {Component} from 'react'
import {View, StyleSheet, Text, Dimensions} from 'react-native'
import {Button} from 'native-base'
import {Col} from 'react-native-easy-grid'

export default class PlayDecision extends Component {
  constructor(props) {
    super(props)

    this.state = {
      button_play: 'Jugar',
      button_dudo: 'Dudo',
      button_spotOn: 'Calzo!'
    }
  }

  render() {
    return (
      <Col>
        <Col>
          <Button
            block
            primary
            style={styles.buttonContainer}
            onPress={this.props.onPress}
          >
            <Text style={styles.buttonText}>{this.state.button_play}</Text>
          </Button>
          <Button block danger style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{this.state.button_dudo}</Text>
          </Button>
          <Button block success style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{this.state.button_spotOn}</Text>
          </Button>
        </Col>
      </Col>
    )
  }
}
SCREEN_WIDTH = Dimensions.get('window').width // get current width
SCALE = 375 // constant, 375 is standard width of  iphone 6 / 7 / 8

const scaleFontSize = fontSize => {
  const ratio = fontSize / SCALE // get ratio based on your standard scale
  const newSize = Math.round(ratio * SCREEN_WIDTH)
  return newSize
}
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: '3%',
    marginLeft: '5%',
    marginRight: '5%',
    height: '27%'
  },
  buttonText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white'
  }
})
