import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Col} from 'react-native-easy-grid'

import VibrateButton from '../vibrateButton'
import {scaleFontSize} from '../../helpers/responsive'

import {withNamespaces} from 'react-i18next'

const COUNTER_START = 30

class InBattleLobby extends Component {
  state = {
    diceLeft: 3,
    counter: COUNTER_START
  }

  timer = null

  onStart = () => {
    this.timer = setInterval(this.onTick, 1000)
  }

  onFinish = () => {
    clearInterval(this.timer)
    this.setState({
      diceLeft: this.state.diceLeft - 1,
      counter: COUNTER_START
    })
    if (this.state.diceLeft > 0) {
      this.onStart()
    } else {
      this.props.onForfeit()
    }
  }

  onTick = () => {
    if (this.state.counter === 0) {
      this.onFinish()
    } else {
      this.setState({counter: this.state.counter - 1})
    }
  }
  componentDidMount() {
    this.onStart()
  }
  render() {
    const {diceLeft, t, i18n} = this.props
    return (
      <Col style={styles.columnStyle}>
        <Text style={styles.freeText}>{t('common:lobby.goToBattle')}</Text>
        <Text style={{color: 'white'}}>{this.state.counter}</Text>
        <Text style={styles.freeText}>
          {t('common:lobby.diceLeft')}
          {this.state.diceLeft}
        </Text>
        <VibrateButton
          style={styles.buttonAlignment}
          onPress={() => this.props.navigation.push('GameTable')}
        >
          <Text style={styles.buttonText}>
            {t('common:lobby.backToBattle')}
          </Text>
        </VibrateButton>
      </Col>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(InBattleLobby)

const styles = StyleSheet.create({
  columnStyle: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonAlignment: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#c8b273',
    height: scaleFontSize(70),
    width: scaleFontSize(200),
    borderWidth: 5,
    borderColor: '#95792A'
  },
  freeText: {
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white',
    fontSize: scaleFontSize(30)
  },
  buttonText: {
    fontFamily: 'MyriadPro-BoldCond',
    color: 'black',
    fontSize: scaleFontSize(30)
  },
  counterDigitStyle: {
    backgroundColor: '#95792A',
    borderWidth: 5,
    borderColor: '#c8b273'
  },
  counterTextStyle: {
    fontFamily: 'MyriadPro-BoldCond',
    color: '#fff'
  }
})
