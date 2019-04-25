import React, {Component} from 'react'
import {StyleSheet, Image, TouchableOpacity} from 'react-native'

import VibrateButton from '../vibrateButton'

import {scaleFontSize} from '../../helpers/responsive'

export default class CupButton extends Component {
  render() {
    return (
      <VibrateButton style={styles.cupButton} onPress={this.props.onPress}>
        <Image
          style={styles.cupIcon}
          resizeMode="contain"
          source={require('../../assets/cup.png')}
        />
      </VibrateButton>
    )
  }
}

const styles = StyleSheet.create({
  cupButton: {
    backgroundColor: 'black',
    marginTop: '5%'
  },
  cupIcon: {
    height: scaleFontSize(70),
    width: scaleFontSize(70)
  },
  cupIconContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
