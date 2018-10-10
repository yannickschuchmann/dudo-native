import React, {Component} from 'react'
import {StyleSheet, Text, Dimensions} from 'react-native'
import {Button} from 'native-base'
import {Col, Row} from 'react-native-easy-grid'

import DiceAmountPicker from './DiceAmountPicker'
import DiceTypePicker from './DiceTypePicker'

export default class PlayPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      button_play: 'Jugar'
    }
  }

  render() {
    return (
      <Col style={styles.rootContainer}>
        <Row>
          <DiceAmountPicker />
        </Row>
        <Row>
          <DiceTypePicker />
        </Row>
        <Row>
          <Button block primary style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{this.state.button_play}</Text>
          </Button>
        </Row>
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
  rootContainer: {
    padding: '3%'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '1%',
    height: '80%'
  },
  buttonText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white'
  }
})
