import React from 'react'
import {Vibration} from 'react-native'
import {Button} from 'native-base'

class VibrateButton extends React.Component {
  render() {
    const props = {
      ...this.props,
      onPress: e => {
        this.props.onPress(e)
      }
    }
    return <Button {...props} />
  }
}

export default VibrateButton
