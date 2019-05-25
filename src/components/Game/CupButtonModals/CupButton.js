import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {Image} from 'react-native'
import VibrateButton from '../../vibrateButton'

import {scaleFontSize} from '../../../helpers/responsive'

export default class CupButton extends Component {
  render() {
    return (
      <VibrateButton
        style={{alignSelf: 'center'}}
        transparent
        onPress={this.props.onPress}
      >
        <Image
          style={styles.buttonSize}
          source={require('../../../assets/cup.png')}
        />
      </VibrateButton>
    )
  }
}

const styles = StyleSheet.create({
  buttonSize: {
    maxWidth: scaleFontSize(70),
    maxHeight: scaleFontSize(70)
  }
})
