import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native'
import {Col, Row} from 'react-native-easy-grid'

import {scaleFontSize} from '../../../helpers/responsive'

export default class DiceAmountPicker extends Component {
  increaseAllowed = () => {
    return this.props.die < this.props.totalDie
  }

  decreaseAllowed = () => {
    return this.props.die > 1
  }

  incrementAmount = () => {
    this.props.onChange(this.props.die + 1)
  }

  decreaseAmount = () => {
    this.props.onChange(this.props.die - 1)
  }

  render() {
    return (
      <Row>
        <Col size={11} />
        <Col size={25}>
          <TouchableOpacity
            onPress={this.decreaseAmount}
            disabled={!this.decreaseAllowed()}
          >
            <Image
              style={styles.pickerContainerLeft}
              source={require('../../../assets/pickerArrow.png')}
            />
          </TouchableOpacity>
        </Col>
        <Col size={25}>
          <ImageBackground
            style={styles.pickerContainerLeft}
            source={require('../../../assets/pickerContainer.png')}
          >
            <Text style={styles.picketAmountText}>{this.props.die}</Text>
          </ImageBackground>
        </Col>
        <Col size={25}>
          <TouchableOpacity
            onPress={this.incrementAmount}
            disabled={!this.increaseAllowed()}
          >
            <Image
              style={styles.pickerContainerRight}
              source={require('../../../assets/pickerArrow.png')}
            />
          </TouchableOpacity>
        </Col>
        <Col />
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
    transform: [{rotateZ: '180deg'}]
  },
  picketAmountText: {
    fontSize: scaleFontSize(50),
    fontFamily: 'MyriadPro-BoldCond',
    color: '#95792A',
    top: '5%'
  }
})
