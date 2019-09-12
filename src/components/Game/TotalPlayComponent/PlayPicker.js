import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Icon } from 'native-base'
import VibrateButton from '../../vibrateButton'
import { Col, Row } from 'react-native-easy-grid'

import { withNamespaces } from 'react-i18next'

import DiceAmountPicker from '../PickerComponent/DiceAmountPicker'
import DiceTypePicker from '../PickerComponent/DiceTypePicker'

import { scaleFontSize } from '../../../helpers/responsive'

export class PlayPicker extends Component {
  state = {
    die: this.props.lastMove.die || 1,
    eyes: this.props.lastMove.eyes || 2,
    isSuccess: true,
    _isMounted: false
  }

  onCheckPlay = async () => {
    const { die, eyes } = this.state
    const isSuccess = await this.props.onMove({ type: 'raise', die, eyes })
    if (this._isMounted) {
      this.setState({ isSuccess: isSuccess })
    }
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render () {
    const { game, lastMove, t, playIsLoading } = this.props
    const { die, eyes, isSuccess } = this.state

    return (
      <Col>
        <Row>
          <DiceAmountPicker
            isSuccess={isSuccess}
            die={die}
            onChange={die => this.setState({ die, isSuccess: true })}
            totalDie={game.total_die}
          />
        </Row>
        <Row>
          <DiceTypePicker
            isSuccess={isSuccess}
            eyes={eyes}
            lastMove={lastMove}
            onChange={eyes => this.setState({ eyes, isSuccess: true })}
          />
        </Row>
        <Row style={styles.buttonRow}>
          <VibrateButton
            disabled={!!playIsLoading}
            style={styles.backButtonContainer}
            onPress={this.props.closePicker}
          >
            <Icon style={styles.icon} name='arrow-back' />
          </VibrateButton>
          <VibrateButton
            disabled={!!playIsLoading}
            style={styles.buttonContainer}
            onPress={this.onCheckPlay}
          >
            <Text style={styles.buttonText}>
              {playIsLoading === 'raise'
                ? t('common:loadingGame')
                : t('common:playButtons.playButtonText')}
            </Text>
          </VibrateButton>
        </Row>
      </Col>
    )
  }
}

export default withNamespaces(['common'], { wait: true })(PlayPicker)

const styles = StyleSheet.create({
  buttonRow: {
    justifyContent: 'space-around'
  },
  backButtonContainer: {
    width: '20%',
    height: '90%',
    justifyContent: 'center',
    backgroundColor: '#8b0000'
  },
  icon: {
    fontSize: scaleFontSize(30)
  },
  buttonContainer: {
    width: '75%',
    height: '90%',
    justifyContent: 'center',
    backgroundColor: 'blue'
  },
  buttonText: {
    width: '25%',
    color: 'white',
    fontFamily: 'Bangers-Regular',
    fontSize: scaleFontSize(30)
  }
})
