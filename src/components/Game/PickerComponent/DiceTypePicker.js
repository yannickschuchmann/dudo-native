import React, {Component} from 'react'
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Vibration
} from 'react-native'
import {Col, Row} from 'react-native-easy-grid'
import {Icon} from 'native-base'

import {scaleFontSize} from '../../../helpers/responsive'

export default class DiceTypePicker extends Component {
  incrementAmount = () => {
    let nextAmount = this.props.eyes + 1
    nextAmount = nextAmount > 6 ? 1 : nextAmount
    this.props.onChange(nextAmount)
  }

  decreaseAmount = () => {
    let prevAmount = this.props.eyes - 1
    prevAmount = prevAmount < 1 ? 6 : prevAmount
    this.props.onChange(prevAmount)
  }

  render() {
    return (
      <Row>
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
            <Icon
              style={[
                styles.diceTypeSaid,
                !this.props.isSuccess && styles.moveIconError
              ]}
              name={`dice-${this.props.eyes}`}
              type="MaterialCommunityIcons"
            />
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
    transform: [{rotateZ: '180deg'}]
  },
  diceTypeSaid: {
    color: '#F58B27',
    fontSize: 50
  },
  moveError: {
    tintColor: 'red'
  },
  moveIconError: {
    color: 'red'
  }
})
