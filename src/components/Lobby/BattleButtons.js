import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Col} from 'react-native-easy-grid'
import VibrateButton from '../vibrateButton'
import {scaleFontSize} from '../../helpers/responsive'

import {withNamespaces} from 'react-i18next'

class BattleButtons extends Component {
  render() {
    const {t, i18n} = this.props
    return (
      <Col style={styles.columnStyle}>
        <Text style={styles.freeText}>{t('common:lobby.goToBattle')}</Text>
        <VibrateButton
          style={styles.buttonAlignment}
          onPress={() => this.props.navigation.push('GameTable')}
        >
          <Text style={styles.buttonText}>{t('common:lobby.vsOne')}</Text>
        </VibrateButton>
        <VibrateButton
          style={styles.buttonAlignment}
          onPress={() => this.props.navigation.push('GameTable')}
        >
          <Text style={styles.buttonText}>{t('common:lobby.vsTwo')}</Text>
        </VibrateButton>
        <VibrateButton
          style={styles.buttonAlignment}
          onPress={() => this.props.navigation.push('GameTable')}
        >
          <Text style={styles.buttonText}>{t('common:lobby.vsThree')}</Text>
        </VibrateButton>
      </Col>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(BattleButtons)

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
  }
})
