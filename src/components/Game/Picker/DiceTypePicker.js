import React, {Component} from 'react'
import {Constants} from 'expo'
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native'
import {Col, Row} from 'react-native-easy-grid'
import {Icon} from 'native-base'

import {scaleFontSize} from '../../../helpers/responsive'

export default class DiceTypePicker extends Component {
  increaseAllowed = () => {
    return this.props.eyes < 6
  }

  decreaseAllowed = () => {
    return this.props.eyes > 1
  }

  incrementAmount = () => {
    this.props.onChange(this.props.eyes + 1)
  }

  decreaseAmount = () => {
    this.props.onChange(this.props.eyes - 1)
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
            <Icon
              style={styles.diceTypeSaid}
              name={`dice-${this.props.eyes}`}
              type="MaterialCommunityIcons"
            />
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
  diceTypeSaid: {
    color: '#95792A',
    fontSize: 50
  }
})
