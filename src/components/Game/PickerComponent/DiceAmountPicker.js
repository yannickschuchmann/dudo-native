import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Vibration
} from 'react-native'
import { Col, Row } from 'react-native-easy-grid'

import { scaleFontSize } from '../../../helpers/responsive'

export default class DiceAmountPicker extends Component {
  incrementAmount = () => {
    let nextAmount = this.props.die + 1
    nextAmount = nextAmount > this.props.totalDie ? 1 : nextAmount
    this.props.onChange(nextAmount)
  }

  decreaseAmount = () => {
    let prevAmount = this.props.die - 1
    prevAmount = prevAmount < 1 ? this.props.totalDie : prevAmount
    this.props.onChange(prevAmount)
  }

  render () {
    return (
      <Row style={{ alignItems: 'center' }}>
        <Col size={16} />
        <Col size={24}>
          <TouchableOpacity onPress={this.decreaseAmount}>
            <Image
              style={[
                styles.pickerContainerLeft,
                !this.props.isSuccess && styles.moveError
              ]}
              source={require('../../../assets/pickerArrow.png')}
            />
          </TouchableOpacity>
        </Col>
        <Col size={25}>
          <ImageBackground
            style={styles.pickerContainerLeft}
            imageStyle={!this.props.isSuccess && styles.moveError}
            source={require('../../../assets/pickerContainer.png')}
          >
            <Text
              style={[
                styles.picketAmountText,
                !this.props.isSuccess && styles.moveIconError
              ]}
            >
              {this.props.die}
            </Text>
          </ImageBackground>
        </Col>
        <Col size={24}>
          <TouchableOpacity onPress={this.incrementAmount}>
            <Image
              style={[
                styles.pickerContainerRight,
                !this.props.isSuccess && styles.moveError
              ]}
              source={require('../../../assets/pickerArrow.png')}
            />
          </TouchableOpacity>
        </Col>
        <Col size={11} />
      </Row>
    )
  }
}

const styles = StyleSheet.create({
  pickerContainerLeft: {
    height: scaleFontSize(65),
    width: scaleFontSize(65),
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerContainerRight: {
    height: scaleFontSize(65),
    width: scaleFontSize(65),
    transform: [{ rotateZ: '180deg' }]
  },
  picketAmountText: {
    fontSize: scaleFontSize(50),
    fontFamily: 'Bangers-Regular',
    color: '#F58B27',
    top: '3%',
    width: '45%'
  },
  moveError: {
    tintColor: 'red'
  },
  moveIconError: {
    color: 'red'
  }
})
