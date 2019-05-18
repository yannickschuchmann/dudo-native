import React from 'react'
import {Platform} from 'expo-core'
import {Vibration, NativeModules} from 'react-native'
import {Button} from 'native-base'
const {ExponentHaptic = {}} = NativeModules
import {Haptic} from 'expo'
class VibrateButton extends React.Component {
  render() {
    const props = {
      ...this.props,
      onPress: e => {
        //HAPTIC FEEDBACK FOR IOS AND SHORT VIBRATION FOR ANDROID
        if (ExponentHaptic.notification) {
          ExponentHaptic.impact(Haptic.ImpactFeedbackStyle.Light)
        }
        if (Platform.android) {
          Vibration.vibrate([0, 25])
        }
        //END OF HAPTIC FEEDBACK CODE
        this.props.onPress(e)
      }
    }
    return <Button {...props} />
  }
}

class VibrateButtonLongPress extends React.Component {
  render() {
    const props = {
      ...this.props,
      onLongPress: e => {
        //HAPTIC FEEDBACK FOR IOS AND SHORT VIBRATION FOR ANDROID
        if (ExponentHaptic.notification) {
          ExponentHaptic.impact(Haptic.ImpactFeedbackStyle.Light)
        }
        if (Platform.android) {
          Vibration.vibrate([0, 25])
        }
        //END OF HAPTIC FEEDBACK CODE
        this.props.onLongPress(e)
      }
    }
    return <Button {...props} />
  }
}
export {VibrateButtonLongPress}

export default VibrateButton
