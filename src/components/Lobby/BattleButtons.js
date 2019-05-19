import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Col, Row} from 'react-native-easy-grid'
import VibrateButton from '../vibrateButton'
import {scaleFontSize} from '../../helpers/responsive'

import {withNamespaces} from 'react-i18next'

class BattleButtons extends Component {
  render() {
    const {t, i18n} = this.props
    return (
      <Col style={styles.columnStyle}>
        <Text style={styles.freeText}>{t('common:lobby.goToBattle')}</Text>
        <Row style={styles.rowStyle}>
          <VibrateButton
            style={styles.buttonAlignment}
            onPress={() => {
              this.props.navigation.push('LoadingBattle', {
                friendBattle: true
              })
            }}
          >
            <Text style={styles.buttonText}>{t('common:lobby.vsFriends')}</Text>
          </VibrateButton>
          <VibrateButton
            style={styles.buttonAlignment}
            onPress={() => {
              this.props.navigation.push('LoadingBattle', {
                friendBattle: false
              })
            }}
          >
            <Text style={styles.buttonText}>{t('common:lobby.vsOne')}</Text>
          </VibrateButton>
        </Row>
        <Row style={styles.rowStyle}>
          <VibrateButton
            style={styles.buttonAlignment}
            onPress={() => {
              this.props.navigation.push('LoadingBattle', {
                friendBattle: false
              })
            }}
          >
            <Text style={styles.buttonText}>{t('common:lobby.vsTwo')}</Text>
          </VibrateButton>
          <VibrateButton
            style={styles.buttonAlignment}
            onPress={() => {
              this.props.navigation.push('LoadingBattle', {
                friendBattle: false
              })
            }}
          >
            <Text style={styles.buttonText}>{t('common:lobby.vsThree')}</Text>
          </VibrateButton>
        </Row>
      </Col>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(BattleButtons)

const styles = StyleSheet.create({
  columnStyle: {
    alignItems: 'center'
  },
  rowStyle: {
    width: '100%',
    justifyContent: 'space-around'
  },
  buttonAlignment: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#c8b273',
    height: scaleFontSize(100),
    width: scaleFontSize(150),
    borderWidth: 5,
    borderColor: '#95792A'
  },
  freeText: {
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white',
    fontSize: scaleFontSize(30),
    alignSelf: 'center'
  },
  buttonText: {
    fontFamily: 'MyriadPro-BoldCond',
    color: 'black',
    fontSize: scaleFontSize(30),
    textAlign: 'center'
  }
})
