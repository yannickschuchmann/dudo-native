import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Col} from 'react-native-easy-grid'
import CountDown from 'react-native-countdown-component'
import VibrateButton from '../vibrateButton'
import {scaleFontSize} from '../../helpers/responsive'

import {withNamespaces} from 'react-i18next'

onDoneCountdown = () => {
  Alert.alert('Countdown Finish.')
}

class InBattleLobby extends Component {
  render() {
    const {diceLeft, t, i18n} = this.props
    return (
      <Col style={styles.columnStyle}>
        <Text style={styles.freeText}>{t('common:lobby.goToBattle')}</Text>
        <CountDown
          until={diceLeft * 30}
          onFinish={this.onDoneCountdown}
          digitStyle={styles.counterDigitStyle}
          digitTxtStyle={styles.counterTextStyle}
          timeToShow={['M', 'S']}
          size={scaleFontSize(30)}
        />
        <Text style={styles.freeText}>
          {t('common:lobby.diceLeft')}
          {this.props.diceLeft}
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
